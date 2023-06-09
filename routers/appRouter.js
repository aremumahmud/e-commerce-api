const express = require('express')
const add_products = require('../controllers/createProducts')
const get_products = require('../controllers/getProducts')
const add_to_cart = require('../controllers/addtocart')
const LockInventory = require('../controllers/lockInventory')
const { checkAuthenticated, checkNotAuthenticated } = require("../authentication/utils");
const get_orders = require('../controllers/fetch_orders')
const Auth = require('../authentication/jwt_auth')
const fetch_categories = require('../controllers/getCategories')
const LockInventoryGuest = require('../controllers/lock_for_guest')
const get_order_view = require('../controllers/viewOrder')
const sendmail_reset = require('../utils/password')
const dbInstance = require('../db')
const router = express.Router()

router
    .route('/add_products')
    .post(add_products)

router
    .route('/get_products/:category')
    .get(get_products)


router
    .route('/get_category')
    .get(fetch_categories)

router
    .route('/add_to_cart')
    .post(add_to_cart)

router
    .route('/lock_inventory')
    .post(Auth, LockInventory)

router
    .route('/lock_inventory_guest')
    .post(LockInventoryGuest)

router
    .route('/fetch_orders')
    .post(Auth, get_orders)
router
    .route('/fetch_order_view')
    .get(get_order_view)


router
    .route('/send_otp')
    .get((req, res) => {
        let email = req.query.email
        if (!email) return res.send({
            error: true,
            msg: 'no email in query'
        })
        dbInstance.sendotp(email).then(resp => {
            res.send(resp)
        }).catch(err => {
            res.send(err)
        })
    })
router
    .route('/verify_otp')
    .get((req, res) => {
        let email = req.query.email
        let token = req.query.token
        if (!email || !token) return res.send({
            error: true,
            msg: 'no email or token in query'
        })
        dbInstance.verify_otp(email, token).then(resp => {
            // console.log(res)
            res.json(resp)
        }).catch(err => {
            res.json(err)
        })
    })

router
    .route('/change_password')
    .get((req, res) => {
        let id = req.query.id
        let password = req.query.password
        let token = req.query.token
        if (!id || !password) return res.send({
            error: true,
            msg: 'no email or token in query'
        })
        dbInstance.changePassword(id, password, token).then(resp => {
            // console.log(res)
            res.json(resp)
        }).catch(err => {
            res.json(err)
        })
    })
module.exports = router