import { Router } from "express";
const router = Router();

import ProductService from '../services/products.service.js';
import MockService from '../services/mock.service.js';
import { authMiddlewareTrue, authMiddlewareFalse } from "../middlewares/auth.js";

router.get("/", async (req, res, next) => {
    try {
        const products = await ProductService.getAll();
        res.status(200).render("index", { products: products , title: "Inicio", session: req.session.user});
    } catch (err) {
        next(err);
    }
})
router.get("/login", authMiddlewareTrue, async (req, res, next) => {
    try {
        res.status(200).render("pages/login", {title: "Login", session: req.session.user});
    } catch (err) {
        next(err)
    }
})
router.get("/register", authMiddlewareTrue, async (req, res, next) => {
    res.status(200).render('pages/register', {title: "Register", session: req.session.user})
})
router.get("/newProduct", authMiddlewareFalse ,async (req, res, next) => {
    res.status(200).render('pages/newProduct', {title: "New Products", session: req.session.user})
})
router.get("/chat", async (req, res, next) => {
    // TODO /chat
})
router.get("/error", async (_req, res, next) => {
    res.status(200).render('pages/error', {title: "Error"})
})
router.get("/mock", async (_req, res, next) => {
    try {
        await ProductService.create(MockService.generateProductMock());
        res.status(200).send("OK!");
    } catch (err) {
        next(err);
    }
})
export default router;

