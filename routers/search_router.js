const express = require('express')
const search_controller = require('../controllers/search')
const router = express.Router()


router
    .route('/search_products')
    .get(search_controller)




module.exports = router