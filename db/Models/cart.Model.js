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
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})


module.exports = mongoose.model('Cart', cart)