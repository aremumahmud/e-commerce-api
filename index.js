const express = require('express')
const app = express()
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");
const methodOverride = require("method-override")
const router = require('./routers/router')
const appRouter = require('./routers/appRouter')
const paystack_router = require('./routers/paystack.router')
const cors = require('cors')
const db = require('./db/user')

require('dotenv').config()



const port = 2000
const initializePassport = require("./authentication/passportConfig");
initializePassport(
    passport,
    (email) => db.findUserByEmail(email),
    (id) => db.findUserById(id)
);


app.use(express.urlencoded({ extended: false }));
app.use(express.json())

// app.use(cookieParser())
app.use(
    session({
        secret: process.env.SESSION_SECRET || "8unto0n4oc7903zm",
        resave: true,
        saveUninitialized: true,
        cookie: {
           
            // secure: true, // Set to true for HTTPS connections
            // sameSite: 'None',
            httpOnly: false,
            maxAge: 8.64e+7
        }
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(flash())
app.use(cors({
    credentials: true,
    origin: 'https://e-commerce-ui-ruddy.vercel.app'
}))

// app.use(function(req, res, next) {
//     res.locals.success_msg = req.flash('success_msg');
//     res.locals.error_msg = req.flash('error_msg');
//     res.locals.error = req.flash('error');
//     next();
// });

app.use(methodOverride("_method"));

app.use("/users", router)
app.use("/v1/api/", appRouter)
app.use("/v1/api/pay/", paystack_router)

app.listen(port, () => {
    console.log('server started at port ' + port)
})