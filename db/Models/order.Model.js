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
    status: { type: String, default: false },
    discount: {
        type: Number,
        default: 0
    },
    orderId: {
        type: Number,
        required: true,
        unique: true,
        default: 1000
    },
    total: Number,
    currency: String,
    payment_method: String
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

Order.pre('save', async function(next) {
    const Order = this.constructor;

    try {
        // Retrieve the latest order document
        const latestOrder = await Order.findOne({}, {}, { sort: { 'orderId': -1 } });

        if (latestOrder) {
            // Increment the order ID value
            this.orderId = latestOrder.orderId + 1;
        } else {
            // If no previous orders exist, start from 1001
            this.orderId = 1001;
        }

        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('Order', Order)