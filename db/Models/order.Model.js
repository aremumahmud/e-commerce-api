const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
})

module.exports = mongoose.model('Order', Order)