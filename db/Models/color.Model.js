const { Schema, default: mongoose } = require("mongoose");

let colorSchema = new Schema({
    image: {
        type: String,
        required: [true, 'A product must have a main image']
    },
    parentProduct: {
        type: String,
        required: true
    },
    inventoryRecord: {
        type: Number,
        default: 0
    },
    quantity: {
        type: Number,
        default: 0
    },
    sold: {
        type: Number,
        default: 0
    },
    isOutOfStock: {
        type: Boolean,
        default: false
    },
    locked: {
        type: Number,
        default: 0
    }

})

//Before saving the Document check if the inventory is balanced to prevent conflicts
colorSchema.post('save', { document: true, query: false }, (err, doc, next) => {

    console.log(err, doc)
    let qty = this.sold + this.locked + this.quantity
    if (qty !== this.inventoryRecord) { // compare sales with inventory
        return next('invalid operation') //if so return an error
    }
    next()
})


module.exports = mongoose.model('Color', colorSchema)