const discountModel = require("./Models/discount.Model")
let generate = require('../utils/create_discount')
class Discount {
    create_discount(value, usage = 1) {
        let discount_code = generate(8)
        return new discountModel({
            discount_code,
            value,
            usage
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

                    if (res.used === res.usage) return reject({
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
                if (res.used === res.usage) return reject({
                    error: true,
                    message: 'dicount_used'
                })
                res.used += 1
                    //res.valid = false
                res.save().then(() => {
                    resolve({
                        error: false,
                        success: true,
                        value: res.value
                    })
                })

            })
        })

    }

    fetch_all_discounts() {
        return discountModel.find()
    }

    destroy_discount(id) {
        return discountModel.findByIdAndDelete(id)
    }
}

module.exports = new Discount()