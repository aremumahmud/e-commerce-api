const express = require('express')
const Auth_Admin = require('../authentication/jwt_admin_auth')
const fetch_shipment = require('../controllers/fetchShipment')
const modify_shipment = require('../controllers/updateShipment')
const router = express.Router()


router
    .route('/get_shipments')
    .get(fetch_shipment)
router
    .route('/modify_shipments')
    .post(Auth_Admin, modify_shipment)


module.exports = router