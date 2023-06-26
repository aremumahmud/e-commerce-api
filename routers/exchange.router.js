const express = require('express')
const fetch_exchange = require('../controllers/exchange')
const router = express.Router()


router
    .route('/get_exchanges')
    .get(fetch_exchange)



module.exports = router