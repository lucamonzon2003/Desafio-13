import userService from "../services/user.service.js";

const passportConfig = () => {
    passport.use((new LocalStrategy({ usernameField: "email", passwordField: "password" },
        function (email, password, done) {
            userService.getById(email).then(user => {
                    if (err) { return done(err); }
                    if (!user) { return done(null, false); }
                    if (!user.verifyPassword(password)) { return done(null, false); }
                    return done(null, user);
            })
        })))
    }