const { Schema, default: mongoose } = require("mongoose");

const CategoryModel = new Schema({
    USD: Number,
    GBP: Number,
    EUR: Number,
    NGN: Number
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

module.exports = mongoose.model('Category', CategoryModel)