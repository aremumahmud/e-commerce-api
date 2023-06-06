const { Schema, default: mongoose } = require("mongoose");

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