const { Schema, default: mongoose } = require("mongoose");

const CategoryModel = new Schema({
    categories: []
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

module.exports = mongoose.model('Category', CategoryModel)