/**
 * @desc  -controller to lockl inventory
 * @param { Object } req - http request object
 * @param { Object } res - http response object
 * @package -dbInstance
 */

const dbInstance = require("../db")
const { v4: uuidV4 } = require("uuid");
const validateDiscount = require("./validate_discount");
const { invalidate_discount } = require("../db/discount");
//const amqpServer = require('../../amqp')

function LockInventory(req, res) {

    let { inventory, price, user_data, discount } = req.body
    let refId = uuidV4()
    // return console.log(discount)
    // return

    //we then have to lock these inventories in parallel
    let operation = inventory.map(product => dbInstance.lockInventory(product._id, product.quantity_for_cart, product.size, refId, true))

    //execute all operations in parralel to optimize and increase operation speeds

    Promise.allSettled(operation).then(results => {
        //filter the results for the rejected inventory
        //this means either an error occured or inventory has been depleted
        console.log(results)
        return results.filter(n => n.status === "fulfilled" ? n.value : false)
    }).then(results => {


        //then we check if the results are null
        //if null we return an error 
        //else we send a success message
        if (results.length === 0) {


            //send to the orders queue 
            // amqpServer.publishToQueue('Order', results)
            return res.status(400).json({
                error: true,
                msg: 'inventory has been depleted'
            })
        }
        //set price
        let ourPrice = 0
        inventory.forEach(element => {
            ourPrice += parseInt(element.price)
        });

        //get prods
        let products = inventory.map(x => ({
            _id: x._id,
            quantity: x.quantity_for_cart,
            price: x.price,
            size: x.size,
            parent_product: x.name,
            image: x.image
        }))

        if (discount.length === 0) {
            dbInstance.attachLocked(req.user._id, refId, ourPrice, user_data, products, currency).then((response) => {
                res.status(200).json({
                    error: false,
                    msg: 'inventory has been successfully locked',
                    isBinded: response.isRef,
                    email_address: response.email_address,
                    payment_uri: response.payment_uri
                })
            }).catch(err => {
                return res.status(400).json({
                    error: true,
                    msg: 'could not attach inventory id'
                })
            })
        } else {
            Promise.allSettled(discount.map(x => invalidate_discount(x))).then(results => {
                return results.filter(n => n.status === "fulfilled" ? n.value : false).map(x => x.value.value)
            }).then(res => {
                return res.reduce((i, n) => {
                    return i + n
                })
            }).then(resp => {
                console.log(res)
                let updated_price = ourPrice - ((resp * ourPrice) / 100)
                dbInstance.attachLockedGuest(refId, updated_price, user_data, products, currency).then((response) => {
                    res.status(200).json({
                        error: false,
                        msg: 'inventory has been successfully locked',
                        isBinded: response.isRef,
                        email_address: response.email_address,
                        payment_uri: response.payment_uri
                    })
                }).catch(err => {
                    console.log(err)
                    return res.status(400).json({
                        error: true,
                        msg: 'could not attach inventory id'
                    })
                })
            })

        }



    })

}

module.exports = LockInventory