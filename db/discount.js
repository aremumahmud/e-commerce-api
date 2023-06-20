const discountModel = require("./Models/discount.Model")
let generate = require('../utils/create_discount')
class Discount {
    create_discount(value) {
        let discount_code = generate(8)
        return new discountModel({
            discount_code,
            value
        }).save()
    }

    verify_discount(discount_code) {
        return new Promise((resolve, reject) => {
            discountModel.findOne({ discount_code })
                .then(res => {
                    if (res == null || res.length == 0 || Object.keys(res).length == 0) return reject({
                        error: true,
                        message: 'discount_not_found'
                    })
                    if (!res.valid) return reject({
                        error: true,
                        message: 'dicount_used'
                    })

                    resolve({
                        error: false,
                        value: res.value
                    })

                }).catch(err => {

                })

        })

    }

    invalidate_discount(discount_code) {

        return new Promise((resolve, reject) => {
            discountModel.findOne({ discount_code }).then(res => {
                if (res == null || res.length == 0 || Object.keys(res).length == 0) return reject({
                    error: true,
                    message: 'discount_not_found'
                })
                if (!res.valid) return reject({
                    error: true,
                    message: 'dicount_used'
                })

                res.valid = false
                res.save().then(() => {
                    resolve({
                        error: false,
                        success: true
                    })
                })

            })
        })

    }
}

module.exports = new Discount()