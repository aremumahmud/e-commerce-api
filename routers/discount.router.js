const express = require('express')
const createDiscount = require('../controllers/discount.Controller')
const validateDiscount = require('../controllers/validate_discount')
const Auth_Admin = require('../authentication/jwt_admin_auth')
const get_discounts = require('../controllers/get_all_discounts')
    //const { destroy_discount } = require('../db/discount')
const destroy_discounts = require('../controllers/destroy_discount')
const router = express.Router()

router
    .route('/create_discount')
    .post(Auth_Admin, createDiscount)


router
    .route('/validate_discount')
    .get(validateDiscount)

router
    .route('/get_all_discounts')
    .get(get_discounts)

router
    .route('/destroy_discount')
    .post(Auth_Admin, destroy_discounts)
module.exports = router