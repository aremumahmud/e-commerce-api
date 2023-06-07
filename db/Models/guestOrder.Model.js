const { Schema, default: mongoose } = require("mongoose");

const guestSchema = new Schema({
    locks: String,
    currentPaymentReference: {},
    reference: String
})

module.exports = mongoose.model('Guest', guestSchema)