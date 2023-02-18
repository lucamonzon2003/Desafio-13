import { Router } from "express";
const router = Router();
import passport from 'passport';

//controllers
import { logout, register, login } from "../controllers/auth.controller.js";

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

router.post("/register", passport.authenticate('register', { failureMessage: true, failWithError: true }), async (req, res, next) => {
    try {

        req.session.user = req.user
        res.redirect('/')
        // register(req, res, next);
    } catch (err) {
        next(err)
    }
})

export default router;