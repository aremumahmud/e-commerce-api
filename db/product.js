const Color = require('./Models/color.Model')
const productsModel = require('./Models/products.Model')
const lockedModel = require('./Models/locked.Model')
const expiresIn = require('.././config')
const UserModel = require('./Models/User.Model')
    //connection plugin
require('./conn')

//payment init
const initialize = require('.././controllers/paystack_pay')
const Paystack = require('../utils/paystack')
const orderModel = require('./Models/order.Model')
const categoryModel = require('./Models/category.Model')
const guestOrderModel = require('./Models/guestOrder.Model')

class Db {
    constructor() {

    }



    /**
     * @desc      Create a new Product Parent
     * @param     { Object } options -options Object
     * @property   { String } options.product_name - Product name
     * @property  { String } options.description - Product description
     * @property  { Number } options.price - Product price
     * @property  { Number } options.discount - Product discount
     * @property  { Array } options.colors -  Product variations
     * @property  { String } options.image - image url
     * @returns   { Promise } - A JSON object representing the type, message, and the product
     */

    createProduct(options) {
        // create color docs then save their ids 
        return new Promise((resolve, reject) => {
            Promise.allSettled(options.varieties.filter(x => {
                if (color.image) {
                    return true
                }
                return false
            }).map(color => new Color(color).save())).then(resp => {
                console.log(resp)
                new productsModel({
                    name: options.product_name,
                    mainImage: options.image,
                    description: options.description,
                    price: options.price,
                    priceAfterDiscount: options.price - options.discount,
                    priceDiscount: options.discount,
                    varieties: resp.map(res => res.value._id),
                    category: options.category
                }).save().then(res => {
                    categoryModel.findOne().then(res => {
                        if (res.length == 0 && !res) {
                            return
                        }
                        if (res.categories.indexOf(options.category) == -1) {
                            res.categories.push(options.category)
                            res.save()
                        }
                    })
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        })



        // // the create a production model and pass those varieties to them


        // //then return the save method as the promise for the results

        // return product.save()
    }

    /**
     * @desc    Lock inventory
     * @param { String } inventoryId - Product ID
     * @param { Number } product_quantity - Product Quantity
     * @param { Boolean } trim -boolean condition to either trim results to ids or not
     * @returns { Promise } - a promise object resolving these results
     */


    lockInventory(inventoryId, product_quantity, refId, trim = false) {

        return new Promise((resolve, reject) => {
                Color
                    .findById(inventoryId) // get the product inventory
                    .then(doc => {
                        let { quantity, locked } = doc // get the quantity and the locked products

                        // check if the product is not more than whats in stock
                        if (quantity < product_quantity) return reject({
                            error: true,
                            msg: 'not enough stock in the inventory'
                        })

                        doc.quantity = quantity - product_quantity // remove the quantity from the product
                        doc.locked = locked + product_quantity //add ythe quantity to the locked 
                        doc
                            .save()
                            .then(res => {
                                new lockedModel({ //then we create a lock model for it
                                        quantity: product_quantity,
                                        product: doc._id,
                                        refId,
                                        expires: (Number(Date.now()) + expiresIn.exp * 60 * 60 * 1000)

                                    })
                                    .save()
                                    .then(res => {
                                        //if the trim variable is true 
                                        //we want to only return only the ids of the locked inventory
                                        //else we want to send it along with a message
                                        trim ? resolve(res._id) : resolve({
                                            error: false,
                                            msg: 'successfully locked inventory',
                                            lockedId: res._id,
                                            product: {
                                                product: doc._id,
                                                quantity: product_quantity
                                            }
                                        })
                                    }).catch(err => {
                                        console.log(err)
                                        reject({
                                            err,
                                            error: true,
                                            msg: 'unable to finish operation' //handle error
                                        })
                                    })
                            })
                            .catch(err => {
                                reject({
                                    err,
                                    error: true,
                                    msg: 'couldnt lock inventory' //handle error
                                })
                            })

                    })
            })
            //get the inventory


    }

    /**
     * @desc  remove and validate a locked product quantity
     * @param { String } lockId - the reference to the locked document
     * @returns { Promise } - returns
     * 
     */

    validateLocked(lockId) {
        return new Promise((resolve, reject) => {
            lockedModel
                .findOneAndDelete({ refId: lockId })
                .populate('product')
                .then(doc => {
                    resolve({ error: false, doc })
                }).catch(err => {
                    reject({
                        error: true,
                        msg: ''
                    })
                })

        })
    }


    getInventory(category) {
        //let g = category ? ({ f: 'f' }) : null
        return new Promise((resolve, reject) => {
            let query = category !== 'all' && category ? ({ category }) : null
                // console.log(query,'k' , category)
            productsModel
                .find(query)
                .populate('varieties')
                .then(res => {
                    resolve({
                        data: res
                    })
                }).catch(err => {
                    reject({
                        error: true
                    })
                })
        })

    }

    getCategories() {
        return new Promise((resolve, reject) => {
            categoryModel
                .findOne()
                .then(res => {
                    resolve({
                        data: res.categories
                    })
                }).catch(err => {
                    reject({
                        error: true
                    })
                })
        })
    }


    attachLocked(user, refId, amount, user_data, products, currency) {
        return new Promise((resolve, reject) => {
            UserModel
                .findById(user)
                .then(res => {
                    initialize(user_data.email_address, amount, user, currency).then(body => {
                        console.log(body)
                        res.locks = refId
                        res.currentPaymentReference = {
                            ...user_data,
                            reference: body.status ? body.data.reference : 'falsey',
                            products
                        }

                        res.save().then(res => {
                            resolve({
                                error: false,
                                isRef: body.status ? true : false,
                                email_address: res.email_address,
                                payment_uri: body.status ? body.data.authorization_url : null
                            })
                        }).catch(err => {
                            reject({
                                error: true
                            })
                        })
                    })

                }).catch(err => {
                    reject({
                        error: true
                    })
                })
        })

    }

    attachLockedGuest(refId, amount, user_data, products, currency) {
        return new Promise((resolve, reject) => {
            new guestOrderModel({
                locks: refId,
                currentPaymentReference: {
                    ...user_data,
                    products
                }

            }).save().then(res => {
                initialize(user_data.email_address, amount, {
                    _id: res._id,
                    role: 'guest'
                }, currency).then(body => {
                    console.log(body)
                    res.currentPaymentReference.reference = body.status ? body.data.reference : 'falsey'
                        //res.reference = body.status ? body.data.reference : 'falsey'
                    res.save().catch(err => {
                        console.log(err)
                    })

                    resolve({
                        error: false,
                        isRef: body.status ? true : false,
                        email_address: user_data.email_address,
                        payment_uri: body.status ? body.data.authorization_url : null
                    })

                })
            })

        })

    }


    validate_payment(reference) {
        return new Promise((resolve, reject) => {
            console.log(reference)
            Paystack.transaction.verify(reference)
                .then(res => {
                    // console.log(res,'dlkx')
                    if (res.code === 'ENOTFOUND') return reject({
                        error: true,
                        msg: 'technical issues at hand'
                    })

                    if (res.status === false) return reject({
                        error: true,
                        msg: res.message
                    })
                    if (res.data && res.data.status !== 'success') return reject({
                        error: true,
                        msg: 'payment failed'
                    })

                    let operation;
                    if (res.data.metadata.role === 'guest') {
                        operation = guestOrderModel.findById(res.data.metadata._id)
                    } else {
                        //console.log(res.data)
                        let userID = res.data.metadata.userId
                        operation = UserModel.findById(userID)
                    }
                    // console.log(operation , res.data.metadata.role)



                    operation
                        .then(user => {
                            if (!user || Object.keys(user).length === 0) return reject({
                                error: true,
                                mesage: 'user not found'
                            })
                            let order = user.currentPaymentReference
                            let products = order.products
                            order.reference = reference
                            console.log(products)
                            let ids = products.map(x => x._id)
                            Color.find({ '_id': { $in: ids } })
                                .then(resp => {

                                    //lets create a new order model
                                    let new_order = {
                                        ...order,
                                        products: resp.map((x, i) => {
                                            //console.log(x)
                                            return {
                                                image: x.image,
                                                id: x._id,
                                                parent_product: x.parentProduct,
                                                quantity: products[i].quantity,
                                                price: products[i].price
                                            }
                                        })
                                    }
                                    new orderModel(new_order).save().then(resp1 => {
                                        let id = resp1._id
                                        user.orders && user.orders.push(id)
                                        user.save().then(r => {
                                            resolve({
                                                error: false,
                                                success: true,
                                                id,
                                                email_address: resp1.email_address
                                            })
                                        })
                                    })

                                })

                        })
                }).catch(err => {
                    console.log(err)
                    reject(err)
                })

        })

    }

    fetch_orders(id) {
        return new Promise((resolve, reject) => {
            UserModel.findById(id)
                .populate('orders')
                .then(res => {
                    resolve({
                        success: true,
                        orders: res.orders
                    })
                }).catch(err => {
                    reject({
                        error: true,
                        err
                    })
                })
        })
    }

    fetch_orders_view(id) {
        return new Promise((resolve, reject) => {
            orderModel.findById(id)
                .then(res => {
                    resolve({
                        success: true,
                        orders: res
                    })
                }).catch(err => {
                    reject({
                        error: true,
                        err
                    })
                })
        })
    }

}



module.exports = Db

// Color.find().then(res => {
//     console.log(res)
// })


// let color = new Color({
//     image: 'http://jeee.lll',
//     parentProduct: '644af46e21718d639eb8d342',
//     inventoryRecord: 10,
//     quantity: 5,
//     sold: 0,
//     locked: 5
// })

// color.save().then(doc => {
//     console.log(doc)
// }).catch(err => {
//     console.log(err)
// })

// let Product = new productsModel({
//     name: 'Air Pods',
//     mainImage: 'htp://jdmnx.ddd',

//     description: 'a good description off air pieces',
//     price: 200,
//     priceAfterDiscount: 150,
//     priceDiscount: 50
// })

// Product.save().then(docs => {
//     console.log(docs)
// }).catch(err => {
//     console.log(err.errors.description.properties.message)
// }).catch(err => {
//     console.log(err.errors.description.properties.message)
// })  console.log(err.errors.description.properties.message)
// })  console.log(err.errors.description.properties.message)
// })  console.log(err.errors.description.properties.message)
// })