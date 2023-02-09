import { Router } from "express";
const router = Router();
import os from 'os';

import minimist from "minimist";

router.get('/info', (_req, res, next) => {
    try {
        res.status(200).json({
            "Argumentos de entrada": minimist(process.argv.slice(2)),
            "Nombre de la plataforma": process.platform,
            "Version de Node": process.version,
            "Memoria total reservada": process.memoryUsage().rss,
            "Path de ejecución": process.execPath,
            "Process id": process.pid,
            "Carpeta del proyecto": process.cwd(),
            "Numero de procesadores en el servidor": os.cpus().length
        })
    } catch (err) {
        next(err)
    }
})

export default router;