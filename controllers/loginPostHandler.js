const passport = require("passport");
const jwt = require("jsonwebtoken");
const JWT_PRIVATE_KEY = process.env.JWT_SECRET || 'fjvghbftygbv hb,k kj';


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
            // console.log(req.isAuthenticated());
            // delete theUser._id
            // delete theUser.password
            // delete theUser.orders
            // delete theUser.payments
            console.log(theUser,'lago')
            res.json({
                errors: false,
                user: {
                    email_address: theUser.email_address,
                    username: theUser.username,
                    token: jwt.sign({
                        expiresIn: '20 days',
                        username: theUser.username,
                        email_address: theUser.email_address,
                        role: theUser.username === 'admin' ? 'admin' : 'customer',
                        id: theUser._id
                    }, JWT_PRIVATE_KEY)
                },
            });
        });
    })(req, res, next);
}