/**
 * @desc  -controller to lockl inventory add products
 * @param { Object } req - http request object
 * @param { Object } res - http response object
 * @package -dbInstance
 */

//database controller
const dbInstance = require('../db')

function get_products(req, res) {
    console.log(req.body, req.query)
    dbInstance.getInventory().then(response => {
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

module.exports = get_products