import { Router } from "express";
const router = Router();
import passport from 'passport';
import multer from "multer";

//controllers
import { logout, register, login } from "../controllers/auth.controller.js";

const upload = multer({dest: 'src/public/uploads'})

router.post("/login", passport.authenticate('login', { failureRedirect: '/error' }), async (req, res, next) => {
    try {
        req.session.user = req.user
        res.redirect('/')
        // login(req, res, next);
    } catch (err) {
        next(err)
    }
})

router.get("/logout", async (req, res, next) => {
    try {
        logout(req, res, next);
    } catch (err) {
        next(err)
    }
})

router.post("/register", passport.authenticate('register',{ failureMessage: true, failWithError: true }), upload.single('avatar'), async (req, res, next) => {
    try {
        req.session.user = req.user
        res.redirect('/')
        // register(req, res, next);
        //TODO no funciona multer
    } catch (err) {
        next(err)
    }
})

export default router;