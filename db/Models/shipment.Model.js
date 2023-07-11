const { Schema, default: mongoose } = require("mongoose");

const ShipmentModel = new Schema({
    local: Number,
    international: Number
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

module.exports = mongoose.model('Shipment', ShipmentModel)