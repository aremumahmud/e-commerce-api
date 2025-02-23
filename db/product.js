const Color = require("./Models/color.Model");
const productsModel = require("./Models/products.Model");
const lockedModel = require("./Models/locked.Model");
const expiresIn = require(".././config");
const UserModel = require("./Models/User.Model");
const bcrypt = require("bcrypt");
//connection plugin
require("./conn");

//payment init
const initialize = require(".././controllers/paystack_pay");
const Paystack = require("../utils/paystack");
const orderModel = require("./Models/order.Model");
const categoryModel = require("./Models/category.Model");
const guestOrderModel = require("./Models/guestOrder.Model");
const generateAccessCode = require("../utils/generate_acess_code");
const sendmail_reset = require("../utils/password");
const generatePaymentLink = require("../config/flutterwave");
const verifyTransaction = require("../config/verify_transaction");
const colorModel = require("./Models/color.Model");

class Db {
    constructor() { }

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
            Promise.allSettled(
                options.varieties
                    .filter((x) => {
                        if (x.image) {
                            return true;
                        }
                        return false;
                    })
                    .map((color) => new Color(color).save())
            ).then((resp) => {
                //(resp);
                let category = options.category.trim()
                new productsModel({
                    name: options.product_name,
                    mainImage: options.image,
                    description: options.description,
                    price: options.price,
                    // priceAfterDiscount: options.price - options.discount,
                    // priceDiscount: options.discount,
                    //sizes: options.sizes,
                    virtual_discount: options.virtual_discount,
                    weight: options.weight,
                    uploadType: options.uploadType,
                    varieties: resp.map((res) => res.value._id),
                    category,
                    USD: options.USD,
                    GBP: options.GBP,
                    EUR: options.EUR
                })
                    .save()
                    .then((res) => {
                        categoryModel.findOne().then((res1) => {
                            if (res1.length == 0 && !res1) {
                                return;
                            }


                            if (res1.categories.indexOf(category) === -1 && category !== '') {
                                res1.categories.push(category);
                                res1.save();
                            }
                        });
                        resolve(res);
                    })
                    .catch((err) => {
                        //(err);
                        reject(err);
                    });
            });
        });

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

    lockInventory(inventoryId, product_quantity, size, refId, trim = false) {
        //(inventoryId);
        return new Promise((resolve, reject) => {
            Color.findById(inventoryId) // get the product inventory
                .then((doc) => {
                    if (!doc)
                        return reject({
                            error: true,
                            msg: "not enough stock in the inventory3",
                        });
                    let { quantity, locked, sizes } = doc; // get the quantity and the locked products
                    let index;
                    if (size){

for (let i = 0; i < sizes.length; i++) {
                        if (sizes[i].size == size) {
                            index = i;
                            break;
                        }
                    }
                         if (index === null)
                        return reject({
                            error: true,
                            msg: "not enough stock in the inventory2",
                    });
                    }
                   
                    
                   
                    // check if the product is not more than whats in stock
                    if (parseInt(size?doc.sizes[index].qty:doc.quantity) < product_quantity)
                        return reject({
                            error: true,
                            msg: "not enough stock in the inventory2",
                        });

                    doc.quantity = quantity - product_quantity; // remove the quantity from the product
                    doc.locked = locked + product_quantity; //add ythe quantity to the locked
                    //(doc.sizes);
                    if(size){

                         doc.sizes[index].qty =
                        parseInt(doc.sizes[index].qty) - product_quantity;
                    let sizesd = [...doc.sizes];
                    //(sizesd);
                    doc.sizes = sizesd;
                    }
                   
                    doc
                        .save()
                        .then((res) => {
                            new lockedModel({
                                //then we create a lock model for it
                                quantity: product_quantity,
                                product: doc._id,
                                refId,
                                expires: Number(Date.now()) + expiresIn.exp * 60 * 60 * 1000,
                            })
                                .save()
                                .then((res) => {
                                    //if the trim variable is true
                                    //we want to only return only the ids of the locked inventory
                                    //else we want to send it along with a message
                                    trim
                                        ?
                                        resolve(res._id) :
                                        resolve({
                                            error: false,
                                            msg: "successfully locked inventory",
                                            lockedId: res._id,
                                            product: {
                                                product: doc._id,
                                                quantity: product_quantity,
                                            },
                                        });
                                })
                                .catch((err) => {
                                    //(err);
                                    reject({
                                        err,
                                        error: true,
                                        msg: "unable to finish operation", //handle error
                                    });
                                });
                        })
                        .catch((err) => {
                            reject({
                                err,
                                error: true,
                                msg: "couldnt lock inventory", //handle error
                            });
                        });
                });
        });
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
                .populate("product")
                .then((doc) => {
                    resolve({ error: false, doc });
                })
                .catch((err) => {
                    reject({
                        error: true,
                        msg: "",
                    });
                });
        });
    }

    getInventory(category) {
        //let g = category ? ({ f: 'f' }) : null
        return new Promise((resolve, reject) => {
            let query = (category !== "all" && category) ? { category } : null;
            // //(query,'k' , category)
            productsModel
                .find(query)
                .populate("varieties")
                .then((res) => {
                    //console.log(res)
                    resolve({
                        data: res,
                    });
                })
                .catch((err) => {
                    reject({
                        error: true,
                    });
                });
        });
    }

    getCategories() {
        return new Promise((resolve, reject) => {
            categoryModel
                .findOne()
                .then((res) => {
                    resolve({
                        data: res.categories,
                    });
                })
                .catch((err) => {
                    reject({
                        error: true,
                    });
                });
        });
    }

    attachLocked(user, refId, amount, user_data, products, currency, discount) {
        return new Promise((resolve, reject) => {
            //("userid", user);
            UserModel.findById(user)
                .then((res) => {
                    generatePaymentLink(
                        amount,
                        currency,
                        user_data.email_address,
                        user_data.name || (user_data.first_name + " " + user_data.last_name),
                        res._id,
                        "user",
                        discount
                    ).then((body) => {
                        //(body);
                        res.locks = refId;
                        res.currentPaymentReference = {
                            ...user_data,
                            reference: body.reference,
                            products,
                        };

                        res
                            .save()
                            .then((res) => {
                                resolve({
                                    error: false,
                                    isRef: body.reference ? true : false,
                                    email_address: res.email_address,
                                    payment_uri: body.reference ? body.paymentLink : null,
                                });
                            })
                            .catch((err) => {
                                reject({
                                    error: true,
                                });
                            });
                    });
                })
                .catch((err) => {
                    reject({
                        error: true,
                    });
                });
        });
    }

    attachLockedGuest(refId, amount, user_data, products, currency, discount) {
        return new Promise((resolve, reject) => {
            new guestOrderModel({
                locks: refId,
                currentPaymentReference: {
                    ...user_data,
                    products,
                },
            })
                .save()
                .then((res) => {
                    generatePaymentLink(
                        amount,
                        currency,
                        user_data.email_address,
                        user_data.name || (user_data.first_name + " " + user_data.last_name),
                        res._id,
                        "guest",
                        discount
                    ).then((body) => {
                        //(body);
                        res.currentPaymentReference.reference = body.reference;
                        //res.reference = body.status ? body.data.reference : 'falsey'
                        res.save().catch((err) => {
                            //(err);
                        });

                        resolve({
                            error: false,
                            isRef: body.reference ? true : false,
                            email_address: user_data.email_address,
                            payment_uri: body.reference ? body.paymentLink : null,
                        });
                    });
                });
        });
    }

    validate_payment(reference) {
        return new Promise((resolve, reject) => {
            //(reference);
            verifyTransaction(reference)
                .then((res) => {
                    //(res, "dlkx");
                    // if (res.code === 'ENOTFOUND') return reject({
                    //     error: true,
                    //     msg: 'technical issues at hand'
                    // })

                    // if (res.status === false) return reject({
                    //     error: true,
                    //     msg: res.message
                    // })
                    // if (res.data && res.data.status !== 'success') return reject({
                    //     error: true,
                    //     msg: 'payment failed'
                    // })

                    if (!res) {
                        return reject({
                            error: true,
                            msg: "technical issues at hand",
                        });
                    }

                    let operation;
                    //let data = res.tx_ref.split('ilovejerkyswears')
                    if (res.meta.role === "guest") {
                        operation = guestOrderModel.findById(res.meta.user_id);
                    } else {
                        //(res);
                        let userID = res.meta.user_id;
                        operation = UserModel.findById(userID);
                    }
                    //(res);
                    let discount = res.meta.discount || 0
                    operation.then((user) => {
                        if (!user || Object.keys(user).length === 0)
                            return reject({
                                error: true,
                                mesage: "user not found",
                            });
                        let order = user.currentPaymentReference;
                        let products = order.products;
                        order.reference = reference;

                        let new_order = {
                            ...order,
                            payment_method: res.payment_type,
                            total: res.charged_amount,
                            currency: res.currency,
                            discount,
                            products: products.map((x, i) => {
                                ////(x)
                                return {
                                    image: x.image,
                                    id: x._id,
                                    parent_product: x.parent_product,
                                    quantity: x.quantity,
                                    price: x.price,
                                    size: x.size,
                                    virtual_discount: x.virtual_discount,
                                    USD: x.USD,
                                    GBP: x.GBP,
                                    EUR: x.EUR

                                };
                            }),
                        };
                        new orderModel(new_order).save().then((resp1) => {
                            let id = resp1._id;
                            user.orders && user.orders.push(id);
                            user.save().then((r) => {
                                resolve({
                                    error: false,
                                    success: true,
                                    resp1,
                                    email_address: resp1.email_address,
                                    discount
                                });
                            });
                        });

                        //    })
                    });
                })
                .catch((err) => {
                    //(err);

                    reject({
                        error: true,
                        msg: "technical issues at hand",
                    });
                });
        });
    }

    fetch_orders(id) {
        return new Promise((resolve, reject) => {
            UserModel.findById(id)
                .populate("orders")
                .then((res) => {
                    resolve({
                        success: true,
                        orders: res.orders,
                    });
                })
                .catch((err) => {
                    reject({
                        error: true,
                        err,
                    });
                });
        });
    }

    fetch_all_orders() {
        return new Promise((resolve, reject) => {
            orderModel
                .find()
                .then((res) => {
                    resolve({
                        success: true,
                        orders: res,
                    });
                })
                .catch((err) => {
                    reject({
                        error: true,
                        err,
                    });
                });
        });
    }

    fetch_orders_view(orderId) {
        return new Promise((resolve, reject) => {
            orderModel
                .findOne({ orderId })
                .then((res) => {
                    resolve({
                        success: true,
                        orders: res,
                    });
                })
                .catch((err) => {
                    reject({
                        error: true,
                        err,
                    });
                });
        });
    }

    sendotp(user) {
        return new Promise((resolve, reject) => {
            UserModel.findOne({ email_address: user })
                .then((res) => {
                    if (!res || Object.keys(res).length === 0)
                        return reject({
                            error: true,
                            mesage: "user not found",
                        });
                    let token = generateAccessCode();

                    res.change_password_token = token;
                    sendmail_reset(user, token);
                    res.save().then(() => {
                        resolve({
                            sucess: true,
                            error: false,
                        });
                    });
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    verify_otp(email, token) {
        console.log(`'${email}'` , token)
        return new Promise((resolve, reject) => {
            UserModel.findOne({ email_address: email.trim(), change_password_token: token })
                .then((res) => {
                    console.log(res)
                    if (!res || Object.keys(res).length === 0)
                        return reject({
                            error: true,
                            mesage: "failed validation",
                        });

                    res.verified = true
                    res.save().then(() => {
                        resolve({
                            userID: res._id,
                        });
                    })

                })
                .catch((err) => reject(err));
        });
    }

    updateProfile(id, update) {
        return new Promise((resolve, reject) => {
            UserModel.findByIdAndUpdate(id , update)
                .then((res) => {
                    
                   
                        resolve({
                            userID: res._id,
                            success: true
                    })

                })
                .catch((err) => reject(err));
        });
    }

    changePassword(id, password, token) {
        return new Promise((resolve, reject) => {
            UserModel.findOne({ _id: id, change_password_token: token })
                .then((res) => {
                    if (!res || Object.keys(res).length === 0)
                        return reject({
                            error: true,
                            mesage: "user not found",
                        });

                    bcrypt.hash(password, 10).then((hashed) => {
                        res.password = hashed;
                        //(hashed);
                        res
                            .save()
                            .then((f) => {
                                //(f);
                                resolve({
                                    success: true,
                                    error: false,
                                });
                            })
                            .catch((err) => reject(err));
                    });
                })
                .catch((err) => reject(err));
        });
    }

    modifyProduct(id, parent, modified, modified1) {
        return colorModel.findByIdAndUpdate(id, modified).then((res) => {
            // //(res)
            return productsModel.findByIdAndUpdate(parent, modified1);
        });
    }

    deleteProduct(id, parent, mode) {
        if (mode === 'ruler') return productsModel.findByIdAndDelete(parent)
        return productsModel
            .findById(parent)
            .populate('varieties')
            .then(prod => {
                let variety_count = prod.varieties.length
                if (variety_count < 2) {
                    return productsModel.findByIdAndDelete(parent)
                }
                return colorModel.findByIdAndDelete(id);
            })

    }

    async getUpdatedVersion(ids) {
        try {
            const records = await productsModel.find().where('_id').in(ids).exec();
            const populatedRecords = await productsModel.populate(records, { path: 'varieties' }); // Replace 'someFieldToPopulate' with the actual field you want to populate

            return populatedRecords;
        } catch (err) {
            console.error('Error fetching users:', err);
            return [];
        }
    }
}

module.exports = Db;

// Color.find().then(res => {
//     //(res)
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
//     //(doc)
// }).catch(err => {
//     //(err)
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
//     //(docs)
// }).catch(err => {
//     //(err.errors.description.properties.message)
// }).catch(err => {
//     //(err.errors.description.properties.message)
// })  //(err.errors.description.properties.message)
// })  //(err.errors.description.properties.message)
// })  //(err.errors.description.properties.message)
// }).description.properties.message)
// }).description.properties.message)
// }).description.properties.message)
// }).description.properties.message)
// }).description.properties.message)
// })
