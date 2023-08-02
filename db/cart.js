const cartModel = require("./Models/cart.Model");

//connection plugin
require('./conn')


class Cart {
    /**
     * this method adds product to the cart
     */

    addToCart(email_address, id, quantity) {
            return new Promise((resolve, reject) => {
                cartModel
                    .findOne({
                        email_address
                    })
                    .then(user => {
                        //validate the response and reject if empty
                        if (!user || user.length === 0 || Object.keys(user).length === 0)
                            return reject({
                                error: 'user_not_found'
                            })

                        //get the product index of the product
                        let product_index =
                            user.items.ids.indexOf(id)
                            //the check of its available
                        product_index ?
                            user.items.quantity[product_index] += quantity :

                            //then we push both to the queue
                            user.items.ids.push(id) && user.items.quantity.push(quantity)

                        //then we save the user
                        user.save().then(res => {
                            resolve({
                                success: true,
                                cart: res.items
                            })
                        }).catch(e => {
                            reject({
                                error: 'save_error',
                                error_object: e
                            })
                        })
                    }).catch(e => {
                        reject({
                            error: 'db error',
                            error_object: e
                        })
                    })
            })
        }
        /**
         * this method adds product to the cart
         */

    addToCart(email_address, id, quantity) {
        return new Promise((resolve, reject) => {
            cartModel
                .findOne({
                    email_address
                })
                .then(user => {
                    //validate the response and reject if empty
                    if (!user || user.length === 0 || Object.keys(user).length === 0)
                        return reject({
                            error: 'user_not_found'
                        })

                    //get the product index of the product
                    let product_index =
                        user.items.ids.indexOf(id)
                        //the check of its available
                    product_index ?
                        user.items.quantity[product_index] += quantity :

                        //then we push both to the queue
                        user.items.ids.push(id) && user.items.quantity.push(quantity)

                    //then we save the user
                    user.save().then(res => {
                        resolve({
                            success: true,
                            cart: res.items
                        })
                    }).catch(e => {
                        reject({
                            error: 'save_error',
                            error_object: e
                        })
                    })
                }).catch(e => {
                    reject({
                        error: 'db error',
                        error_object: e
                    })
                })
        })
    }
}

module.exports = new Cart()

// cartModel.find().then(res => {
//     //(res)
// })