/**
 * @desc  -controller to lockl inventory add products
 * @param { Object } req - http request object
 * @param { Object } res - http response object
 * @package -dbInstance
 */

//database controller
const dbInstance = require('../db')
const { set_delivery_true } = require('../db/shipment')
const d = require('../utils/404')

const send_delivery_email_function = require('../utils/send_delivery_mail')

function send_delivery_email(req, res) {
    if (!req.query.id) return res.status(400).json({
        message: 'unauthorized user',
        success: false,
        error: true
    })

    let id = req.query.id
        ////(req.body, req.query)
    dbInstance.fetch_orders_view(id).then(response => {
        let orders = response.orders
        if (orders) {
            set_delivery_true(id).then(() => {
                send_delivery_email_function(orders.email_address, orders, orders.discount)
                return res.status(200).send({
                    success: true,
                    error: false
                })
            })
return
        }

        return res.status(400).send(d)
            // ({
            //     success: true,
            //     data: generate(response.orders)
            // })
    }).catch(err => {
        // //(err)
        res.status(400).send(d)
    })
}

module.exports = send_delivery_email