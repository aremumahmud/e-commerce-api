const { Schema, default: mongoose } = require("mongoose");

let UserModel = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email_address: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    locks: String,
    orders: [{
        type: Schema.Types.ObjectId,
        ref: 'Order'
    }],
    payments: [],
    currentPaymentReference: {},
    change_password_token: String,
    verified: Boolean,
    phone_number: String,
    full_name: String,
    gender: String,
    uploadedImage: String


}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

module.exports = mongoose.model('User', UserModel)
    //module.exports = mongoose.model('User', User)