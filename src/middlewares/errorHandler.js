import logger from "../config/logger.js"

export const errorHandler = (err, req, res, _next) => {
    res.status(500).json({
        error: err.message,
        status: 500,
        success: false
    })
    logger.error(err, req.url, req.method)
}