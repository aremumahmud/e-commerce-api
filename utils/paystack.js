require('dotenv').config()
const MODE = process.env.APP_MODE
let decider = {
    0: 'PRODUCTION_PAYPAL_SECRET_KEY',
    1: 'DEVELOPMENT_PAYPAL_SECRET_KEY'
}

const MySecretKey = MODE == 'production' ? process.env[decider[0]] : process.env[decider[1]]
    //console.log(process.env)
const Paystack = require('paystack')(MySecretKey);

module.exports = Paystack