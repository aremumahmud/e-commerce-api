const express = require('express')
const router = express.Router()
const pay = require('../controllers/paystack_pay')
const initialize = require('../controllers/paystack_pay')
const verifyTransaction = require('../controllers/paystack_callback')


router
    .route('/pay_for_product')
    .get((req, res) => {
        let { email, amount } = req.query
        initialize(email, amount).then(body => {
            res.status(200).json(body)
        })
    })

router
    .route('/verify_payment')
    .get(verifyTransaction)

module.exports = router