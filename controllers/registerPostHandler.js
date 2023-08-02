const db = require("../db/user");
const bcrypt = require("bcrypt");
const passport = require("passport");

module.exports = async(req, res) => {
        try {
            let { email, password, username } = req.body;
            //(req.body);
            if (!(email && password && username)) {
                return res.json({
                    error: "missing credentials",
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            db.createUser(email, username, hashedPassword)
                .then((user) => {
                    res.redirect("/users/login");
                })
                .catch((e) => {
                    //(e);
                    res.redirect("/users/register?error=exist");
                });
        } catch (e) {
            //(e);
            res.redirect("/users/register?error=unknown");
        }

        // check if the user is successfully added to array
        // //(users);o
    } // //(users);o