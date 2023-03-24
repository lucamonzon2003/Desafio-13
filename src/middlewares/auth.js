import logger from "../config/logger.js";

export const authMiddlewareFalse = (req, res, next) => {
    if(!req.isAuthenticated()){
        res.redirect('/');
     }
     next();
}
export const authMiddlewareTrue = (req, res, next) => {
    if(req.isAuthenticated()){
       res.redirect('/');
    }
    next();
}
