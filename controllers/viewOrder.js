/**
 * @desc  -controller to lockl inventory add products
 * @param { Object } req - http request object
 * @param { Object } res - http response object
 * @package -dbInstance
 */

//database controller
const dbInstance = require('../db')
const d = require('../utils/404')
const generate = require('./generateEmail')

function get_order_view(req, res) {
    if (!req.query.id) return res.status(400).json({
        message: 'unauthorized user',
        success: false,
        error: true
    })

    let id = req.query.id
        ////(req.body, req.query)
    dbInstance.fetch_orders_view(id).then(response => {

        response.orders ? res.status(200).send(generate(response.orders)) : res.status(400).send(d)
            // ({
            //     success: true,
            //     data: generate(response.orders)
            // })
    }).catch(err => {
        console.log(err)
        res.status(400).send(d)
    })
}

module.exports = get_order_view