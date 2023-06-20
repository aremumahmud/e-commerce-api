const express = require('express')
const createDiscount = require('../controllers/discount.Controller')
const validateDiscount = require('../controllers/validate_discount')
const router = express.Router()

router
    .route('/create_discount')
    .get(createDiscount)


router
    .route('/validate_discount')
    .get(validateDiscount)


module.exports = router