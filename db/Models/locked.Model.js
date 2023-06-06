const { Schema, default: mongoose } = require("mongoose");

let lockedSchema = new Schema({

    quantity: {
        type: Number,
        require: [true, 'a locked product cannot have a value of null']
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Color'
    },
    refId: {
        type: String,
        required: [true, 'a locked product must have a reference ID'],
    },
    expiry: Number

}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})


module.exports = mongoose.model('Locked', lockedSchema)