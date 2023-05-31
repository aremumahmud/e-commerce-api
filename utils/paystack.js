require('dotenv').config() //const MySecretKey = "Bearer sk_test_75592d2e061e4ff6886f54943992f8b2d1961c00";
const MODE = process.env.APP_MODE
let decider = {
    0: 'PRODUCTION_PAYPAL_SECRET_KEY',
    1: 'DEVELOPMENT_PAYPAL_SECRET_KEY'
}

const MySecretKey = MODE == 'production' ? process.env[decider[0]] : process.env[decider[1]]
    //console.log(process.env)
const Paystack = require('paystack')(MySecretKey);

module.exports = Paystack