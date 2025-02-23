const { Schema, default: mongoose } = require("mongoose");

let productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'A product must have a name'],
        trim: true
    },
    mainImage: {
        type: String,
        required: [true, 'A product must have a main image']
    }, 

    description: {
        type: String,
        required: [true, 'A product must have a description']
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    priceAfterDiscount: {
        type: Number,
        required: true,
        default: 0
    },
    priceDiscount: {
        type: Number,
        validate: {
            validator: function(value) {
                // this only points to current doc on NEW documnet creation
                return value < this.price;
            },
            message: 'Discount price ({VALUE}) should be below regular price'
        }
    },

    varieties: [{
        type: mongoose.Types.ObjectId,
        ref: 'Color'
    }],
    weight: {
        type: Number,
        required: true,
        default: 1
    },
    virtual_discount: {
        type: Number,
        default: 0
    },
    category: String,
    uploadType: {
        type: String,
        default: 'default'
    },
    USD: {
        type: Number,
        default: 0
    },
    GBP: {
        type: Number,
        default: 0
    },
    EUR: {
        type: Number,
        default: 0
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

productSchema.index({ '$**': 'text' })

module.exports = mongoose.model('Product', productSchema)