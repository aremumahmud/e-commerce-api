const mongoose = require('mongoose')
const { Schema } = mongoose

let cart = new Schema({
    user: {
        required: true,
        type: String
    },
    items: {
        ids: [],
        quantity: []
    }
})


module.exports = mongoose.model('Cart', cart)