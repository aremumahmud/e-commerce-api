const mongoose = require('mongoose');

const riderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    currentOrder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        default: null
    },
    rating: {
        type: Number,
        default: 0
    },
    totalDeliveries: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Method to update rider availability
riderSchema.methods.updateAvailability = async function(isAvailable) {
    this.isAvailable = isAvailable;
    return this.save();
};

// Method to assign an order to the rider
riderSchema.methods.assignOrder = async function(orderId) {
    this.currentOrder = orderId;
    this.isAvailable = false;
    return this.save();
};

// Method to complete an order
riderSchema.methods.completeOrder = async function() {
    this.currentOrder = null;
    this.isAvailable = true;
    this.totalDeliveries += 1;
    return this.save();
};

const Rider = mongoose.model('Rider', riderSchema);

module.exports = Rider;