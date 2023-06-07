/**
 * @desc  -controller to lockl inventory add products
 * @param { Object } req - http request object
 * @param { Object } res - http response object
 * @package -dbInstance
 */

//database controller
const dbInstance = require('../db')
const generate = require('./generateEmail')

function get_order_view(req, res) {
    if (!req.query.id) return res.status(400).json({
        message: 'unauthorized user',
        success: false,
        error: true
    })

    let id = req.query.id
        //console.log(req.body, req.query)
    dbInstance.fetch_orders_view(id).then(response => {
        res.status(200).send(generate(response.orders))
            // ({
            //     success: true,
            //     data: generate(response.orders)
            // })
    }).catch(err => {
        console.log(err)
        res.status(400).json({
            message: 'there was an unexpected turn of events',
            success: false,
            error: true
        })
    })
}

module.exports = get_order_view