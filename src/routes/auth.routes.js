import { Router } from "express";
const router = Router();
import passport from 'passport';

//controllers
import { logout, register, login } from "../controllers/auth.controller.js";

router.post("/login", passport.authenticate('login', { failureRedirect: '/error' }), async (req, res, next) => {
    req.session.user = req.user
    res.redirect('/')
    // login(req, res, next);
})

router.get("/logout", async (req, res, next) => {
    logout(req, res, next);
})

router.post("/register", passport.authenticate('register', { failureMessage: true, failWithError: true }), async (req, res, next) => {
    // register(req, res, next);
    req.session.user = req.user
    res.redirect('/')
})

export default router;