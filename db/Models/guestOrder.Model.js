const { Schema, default: mongoose } = require("mongoose");

const guestSchema = new Schema({
    locks: String,
    currentPaymentReference: {},
    reference: String
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

module.exports = mongoose.model('Guest', guestSchema)