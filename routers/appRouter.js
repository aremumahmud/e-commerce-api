const express = require('express')
const add_products = require('../controllers/createProducts')
const get_products = require('../controllers/getProducts')
const add_to_cart = require('../controllers/addtocart')
const LockInventory = require('../controllers/lockInventory')
const { checkAuthenticated, checkNotAuthenticated } = require("../authentication/utils");
const get_orders = require('../controllers/fetch_orders')
const router = express.Router()

router
    .route('/add_products')
    .post(add_products)

router
    .route('/get_products')
    .get(get_products)


router
    .route('/add_to_cart')
    .post(add_to_cart)

router
    .route('/lock_inventory')
    .post(checkAuthenticated, LockInventory)

router
    .route('/fetch_orders')
    .post(checkAuthenticated, get_orders)

module.exports = router