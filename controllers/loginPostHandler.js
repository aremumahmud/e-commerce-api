const passport = require("passport");


module.exports = (req, res, next) => {
    // console.log("kz,mjmxn xn xk ikxn xm");
    console.log(req.body)
    passport.authenticate("local", (err, theUser, failure) => {
        if (err) {
            return res.json({
                error: true,
            });
        }
        if (!theUser) {
            return res.json({
                error: true,
            });
        }
        req.login(theUser, (err) => {
            if (err) {
                return res.json({
                    errors: err,
                });
            }
            console.log(req.isAuthenticated());
            delete theUser._id
            delete theUser.password
            delete theUser.orders
            delete theUser.payments
            res.json({
                errors: false,
                user: theUser,
            });
        });
    })(req, res, next);
}