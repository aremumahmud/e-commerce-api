/**
 * @desc  -controller to add products to cart
 * @param { Object } req - http request object
 * @param { Object } res - http response object
 * @package -dbInstance
 */

//database controller

const dbInstance = require("../db")

function fetch_categories(req, res) {
    // let { email_address, id, quantity } = req.body
    //  console.log(req.body, req.query)
    dbInstance.getCategories().then(response => {
        res.status(200).json({
            success: true,
            data: response
        })
    }).catch(err => {
        res.status(400).json({
            message: 'there was an unexpected turn of events',
            success: false,
            error: true
        })
    })
}

module.exports = fetch_categories