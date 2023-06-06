const { Schema, default: mongoose } = require("mongoose");

const CategoryModel = new Schema({
    categories: []
})

module.exports = mongoose.model('Category', CategoryModel)