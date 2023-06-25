const { Schema, default: mongoose } = require("mongoose");

const Order = new Schema({
    reference: String,
    first_name: String,
    last_name: String,
    phone_number: String,
    email_address: String,
    city: String,
    zip_code: String,
    address: String,
    products: [],
    status: String
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

module.exports = mongoose.model('Order', Order)