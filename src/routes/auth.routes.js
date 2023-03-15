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

router.post("/register", passport.authenticate('register', upload.single('avatar'), { failureMessage: true, failWithError: true }), async (req, res, next) => {
    try {
        req.session.user = req.user
        const avatar = req.file.avatar
        res.redirect('/')
        // register(req, res, next);
    } catch (err) {
        next(err)
    }
})

export default router;