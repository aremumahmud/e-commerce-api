const express = require("express");

const loginPostHandler = require("../controllers/loginPostHandler");
const registerPostHandler = require("../controllers/registerPostHandler");
const { checkAuthenticated, checkNotAuthenticated } = require("../authentication/utils");
const Auth = require("../authentication/jwt_auth");

let router = express.Router();

router
    .route("/dashboard")
    .get(Auth, (req, res) => {
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
    .get((r,res)=>{
      res.json({
        success: true
      })
    })
    .post(loginPostHandler);

router
    .route("/register")
    .get((req, res) => {
        let err = req.query.error;
        if (err == "exist") {
            return res.json({ error: "User exists!" });
        } else if (err == "unknown") {
            return res.json({ error: "an unexpected error occured" });
        }
        return res.json({ error: null });
    })
    .post(registerPostHandler);

router.route("/logout").delete((req, res) => {
    req.logOut(() => {});
    res.redirect("/users/login");
});

module.exports = router;