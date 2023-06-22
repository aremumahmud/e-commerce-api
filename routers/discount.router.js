const express = require('express')
const createDiscount = require('../controllers/discount.Controller')
const validateDiscount = require('../controllers/validate_discount')
const Auth_Admin = require('../authentication/jwt_admin_auth')
const router = express.Router()

router
    .route('/create_discount')
    .post(Auth_Admin, createDiscount)


router
    .route('/validate_discount')
    .get(validateDiscount)


module.exports = router