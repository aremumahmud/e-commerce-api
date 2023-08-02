// adding passport related configuration
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

function initialize(passport, getUserByEmail, getUserById) {


    const authenticateUser = async(email, password, done) => {
        // getUserByEmail(email).then(async(user) => {
        //(email, password)
        let user = getUserByEmail(email).then(async user => {
            if (user) {
                try {
                    if (await bcrypt.compare(password, user.password)) {
                        //('masha')
                        //(user)
                        return process.nextTick(() => done(null, user));
                    } else {

                        return process.nextTick(() => done(null, false, { message: "Invalid credentials" }));
                    }
                } catch (e) {
                    return process.nextTick(() => done(null, false, { message: "Error Occured" }));;
                }
            } else {
                return process.nextTick(() => done(null, false, {
                    message: 'User Not Found'
                }));
            }
        }).catch(err => {
            return process.nextTick(() => done(null, false, {
                message: 'User Not Found'
            }));
        });



        // else {
        //     return process.nextTick(() => done(null, false, {
        //         message: 'User Not Found'
        //     }));
        // };
    }
    passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
    passport.serializeUser((user, done) => {
        //('serialize user')
        process.nextTick(() => done(null, user.id));
    })

    passport.deserializeUser((id, done) => {
        //('deserialize user')
        getUserById(id).then(res => {
            //('deserialize user')
            return process.nextTick(() => done(null, res));
        })

    });



}

module.exports = initialize;