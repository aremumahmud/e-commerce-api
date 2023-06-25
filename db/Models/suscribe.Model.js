const { Schema, default: mongoose } = require('mongoose')

const Suscribe_model = new Schema({
    user_email_address: {
        type: String,
        unique: true
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

module.exports = mongoose.model('Suscribe', Suscribe_model)