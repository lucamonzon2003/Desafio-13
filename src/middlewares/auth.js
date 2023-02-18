import logger from "../config/logger.js";

export const authMiddleware = (req, res, next) => {
    if(req.isAuthenticated()){
       res.redirect('/');
       logger.warn('Ya existe una session!')
    }
    next();
}