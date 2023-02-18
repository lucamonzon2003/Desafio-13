import mongoose from 'mongoose';
import 'dotenv/config';


let MONGO_URI
const MONGO_USER = process.env.MONGO_USER
const MONGO_PASSWORD = process.env.MONGO_PASSWORD
const MONGO_DB_NAME = process.env.MONGO_DB_NAME
const MONGO_QUERY = process.env.MONGO_QUERY
const MONGO_HOST = process.env.MONGO_HOST

if (!MONGO_USER) {
    MONGO_URI = `${process.env.MONGO_URI}/${MONGO_DB_NAME}`
}
else {
    MONGO_URI = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DB_NAME}?${MONGO_QUERY}`
}
mongoose.set('strictQuery', false)


export default {
    mongoUri: MONGO_URI,
    config: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
};