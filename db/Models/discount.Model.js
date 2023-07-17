const { default: mongoose, Schema } = require('mongoose')

const DiscountModel = new Schema({

    discount_code: {
        type: String,
        unique: true
    },
    value: Number,
    usage: {
        type: Number,
        default: 1
    },
    used: {
        type: Number,
        default: 0
    },
    valid: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})


module.exports = mongoose.model('Discount', DiscountModel)