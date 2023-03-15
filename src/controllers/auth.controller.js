import authService from '../services/auth.service.js';

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const logedIn = await authService.login(email, password);
        if (!logedIn) {
            return res.status(401).json({
                statusCode: 401,
                error: 'email or password incorrect!',
                message: '401 Unauthorized'
            });
        }
        req.session.user = logedIn;
        res.status(200).redirect("/");
    } catch (err) {
        next(err)
    }
}

export const register = async (req, res, next) => {
    try {
        const data = req.body;
        const user = await authService.register(data);
        req.session.user = user
        res.status(201).redirect("/");
    } catch (err) {
        next(err)
    }
}

export const logout = async (req, res, next) => {
    try {
        req.logout(() => {
            res.redirect('/')
        })
    } catch (err) {
        next(err)
    }
}
