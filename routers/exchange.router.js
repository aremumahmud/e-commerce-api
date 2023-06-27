const express = require('express')
const fetch_exchange = require('../controllers/exchange')
const Auth_Admin = require('../authentication/jwt_admin_auth')
const modify_exchange = require('../controllers/modifyExchange')
const router = express.Router()


router
    .route('/get_exchanges')
    .get(fetch_exchange)
router
    .route('/modify_exchange')
    .post(Auth_Admin, modify_exchange)


module.exports = router