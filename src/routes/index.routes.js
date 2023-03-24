import { Router } from "express";
const router = Router();

import auth from './auth.routes.js';
import client from './client.routes.js';
// import random from './randoms.routes.js';
import info from './info.routes.js';
import product from './product.routes.js'

router.get("/health", (_req, res) => {
    res.status(200).json({
        succes: true,
        status: "ok"
    })
});

router.use(client);
router.use(auth);
// router.use('/api', random);
router.use(info);
router.use(product)


export default router;