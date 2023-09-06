/**
 * @desc  -controller to add products to cart
 * @param { Object } req - http request object
 * @param { Object } res - http response object
 * @package -dbInstance
 */

//database controller

const dbInstance = require("../db/user")

function get_user_info(req, res) {
    // let { email_address, id, quantity } = req.body
    //  console.log(req.body, req.query)
    let id = req.user._id

    if (!id) return res.status(400).json({
        message: 'there was an unexpected turn of events',
        success: false,
        error: true
    })

    dbInstance.findUserById(id).then(response => {

        let {
            username,
            email_address
        } = response

        res.status(200).json({
            success: true,
            data: {
                username,
                email_address
            }
        })
    }).catch(err => {
        res.status(400).json({
            message: 'there was an unexpected turn of events',
            success: false,
            error: true
        })
    })
}

module.exports = get_user_info