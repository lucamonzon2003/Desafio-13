import { Router } from "express";
import productsService from "../services/products.service.js";
const router = Router();

router.post('/newProduct', async (req, res, next) => {
    try {
    const { title, price, thumbnail } = req.body
    await productsService.create({title, price, thumbnail})
    res.status(200).redirect('/newProduct')
    } catch (error) {
        throw new Error(error)
    }
})

export default router;