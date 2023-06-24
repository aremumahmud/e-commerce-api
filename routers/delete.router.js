const express = require('express')
const delete_user = require('../controllers/deleteUser')
const delete_product = require('../controllers/deleteProducts')
const Auth_Admin = require('../authentication/jwt_admin_auth')
const Auth = require('../authentication/jwt_auth')
let router = express.Router()

router
    .route('/deleteUser')
    .post(Auth, delete_user)

router
    .route('/deleteProduct')
    .post(Auth_Admin, delete_product)


module.exports = router