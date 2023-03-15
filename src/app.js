import express from 'express';
import dotenv from 'dotenv'
import _ from 'lodash';
import logger from './config/logger.js';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import http from 'http';
import { Server as IoServer } from 'socket.io';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
// const LocalStrategy = require('passport-local').Strategy;
import compression from 'compression';
dotenv.config();

import indexRouter from './routes/index.routes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import authService from './services/auth.service.js';
import userService from './services/user.service.js';

import dbConfig from './services/databases/config/mongo.js';
import mongoose from 'mongoose';


const app = express();
const server = http.createServer(app)
const io = new IoServer(server);

mongoose.connect(dbConfig.mongoUri, dbConfig.config, console.info('db connect!'))

app.use(compression())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

const { COOKIES_SECRET, MONGO_URI } = process.env
app.use(session({
    secret: COOKIES_SECRET,
    store: MongoStore.create({
        mongoUrl: MONGO_URI,
        ttl: 10 * 60,
        stringify: true,
        dbName: "ecommerce"
    }),
    saveUninitialized: false,
    resave: true
}));

passport.use('login', new LocalStrategy({
    usernameField: "email"
}, async (email, password, done) => {
    const userData = await authService.login(email, password);
    if (!userData) {
        return done(null, false);
    }
    done(null, userData);
}))

passport.use('register', new LocalStrategy({ usernameField: "email", passReqToCallback: true }, async (req, email, password, done) => {
    try {
        const { name, adress, phone, age } = req.body
        const userData = await authService.register({ email, password, name, adress, phone, age });
        //TODO probar pasar solo req.body
        if (!userData) {
            return done(null, false);
        }
        done(null, userData);
    } catch(err) {
        done(null, false)
    }
}))

passport.serializeUser((user, done) => {
    done(null, user.email)
})
passport.deserializeUser(async (email, done) => {
    const userData = await userService.getById(email);
    done(null, userData);
})

app.use(passport.initialize());
app.use(passport.session());

// io.on('connection', async (socket) => {
//     console.info('Nuevo cliente conectado')
//     socket.on('NEW_MESSAGE_CLI', async message => {
//         message.fyh = new Date().toLocaleString();
//         await messageDb.save(message);
//         console.info(message);
//         io.sockets.emit('NEW_MESSAGE_SERVER', message);
//     });
//     socket.on('NEW_PRODUCT_CLI', async product => {
//         await productDb.save(product)
//         console.info(product);
//         io.sockets.emit('NEW_PRODUCT_SERVER', product);
//     });
// });

// app.use((req, _res, next) => {
//     logger.info(`${req.method} & ${req.url}`)
//     next();
// })
//TODO resolver problema con el authMiddleware
app.use(indexRouter);
app.use(errorHandler);
export default server;