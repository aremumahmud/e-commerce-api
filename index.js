const express = require('express')
const app = express()
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");
const methodOverride = require("method-override")

//
const router = require('./routers/router')
const appRouter = require('./routers/appRouter')
const paystack_router = require('./routers/paystack.router')
const search_router = require('./routers/search_router')
const discount_router = require('./routers/discount.router')
const delete_router = require('./routers/delete.router')
const exchange_router = require('./routers/exchange.router')
const shipment_router = require('./routers/shipment.router')
    //
const cors = require('cors')
const db = require('./db/user')

require('dotenv').config()



const port = 2000
const initializePassport = require("./authentication/passportConfig");
const Auth_Admin = require('./authentication/jwt_admin_auth');
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

            domain: '.aremzy.repl.co',
            path: '/',
            secure: false, // Set to true for HTTPS connections
            sameSite: 'none',
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
    origin: ['https://e-commerce-ui-ruddy.vercel.app', 'http://localhost:3000']

}))

// app.use(function(req, res, next) {
//     res.locals.success_msg = req.flash('success_msg');
//     res.locals.error_msg = req.flash('error_msg');
//     res.locals.error = req.flash('error');
//     next();
// });


app.post('/isAdmin', Auth_Admin, (req, res) => {
    res.status(200).json({
        error: false,
        login: true,
        authorized: 'yes',
        msg: 'user  authorized to perform this action'
    })
})

app.use(methodOverride("_method"));

app.use("/users", router)
app.use("/v1/api/", appRouter)
app.use("/v1/api/pay/", paystack_router)
app.use('/v1/api/search/', search_router)
app.use('/v1/api/discount/', discount_router)
app.use('/v1/api/delete/', delete_router)
app.use('/v1/api/exchange/', exchange_router)
app.use('/v1/api/shipment/', shipment_router)

app.listen(port, () => {
    console.log('server started at port ' + port)
})