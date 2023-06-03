const express = require("express");

const loginPostHandler = require("../controllers/loginPostHandler");
const registerPostHandler = require("../controllers/registerPostHandler");
const { checkAuthenticated, checkNotAuthenticated } = require("../authentication/utils");

let router = express.Router();

router
    .route("/dashboard")
    .get(checkAuthenticated, (req, res) => {
        let theUser = req.user
            // delete theUser._id
            // delete theUser.password
            // delete theUser.orders
            // delete theUser.payments
        res.json({
            auth: {
                user: {
                    email_address: theUser.email_address,
                    username: theUser.username
                }
            }
        });
    });

router
    .route("/login")
    .get(checkNotAuthenticated, (req, res) => {
        //send a false message 
        res.send({ login: false });
    })
    .post(checkNotAuthenticated, loginPostHandler);

router
    .route("/register")
    .get(checkNotAuthenticated, (req, res) => {
        let err = req.query.error;
        if (err == "exist") {
            return res.json({ error: "User exists!" });
        } else if (err == "unknown") {
            return res.json({ error: "an unexpected error occured" });
        }
        return res.json({ error: null });
    })
    .post(checkNotAuthenticated, registerPostHandler);

router.route("/logout").delete((req, res) => {
    req.logOut(() => {});
    res.redirect("/users/login");
});

module.exports = router;