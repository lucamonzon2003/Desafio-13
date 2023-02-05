import { Router } from "express";
const router = Router();
import child_process from "child_process";

router.get('/randoms', (req, res, next) => {
    try {
        const cant = req.query.cant || 100_000_000;
        const fork = child_process.fork('./src/services/random.service.js')
        fork.send(cant)
        fork.on('message', (result) => {
            res.status(200).json(result)
        })
    } catch (err) {
        next(err)
    }
})

export default router;