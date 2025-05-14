const { Schema, default: mongoose } = require("mongoose");

const OrderModel = new Schema({
    // orderId: { type: String, required: true, unique: true },
    // userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
    }, ],
    // totalAmount: { type: Number, required: true },
    address: {
        type: String
    },
    status: {
        type: String,
        enum: [
            "pending",
            "processing",
            "assigned",
            "in_transit",
            "delivered",
            "cancelled",
        ],
        default: "processing",
    },
    rider: {
        riderId: { type: Schema.Types.ObjectId, ref: "Rider" },
        assignedAt: { type: Date },
        acceptedAt: { type: Date },
    },
    deliveryConfirmation: {
        riderConfirmed: { type: Boolean, default: false },
        userConfirmed: { type: Boolean, default: false },
        confirmedAt: { type: Date },
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "paid", "failed", "refunded"],
        default: "pending",
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

// Method to check if delivery is confirmed by both parties
OrderModel.methods.isDeliveryConfirmed = function() {
    return (
        this.deliveryConfirmation.riderConfirmed &&
        this.deliveryConfirmation.userConfirmed
    );
};

// Method to update delivery confirmation
OrderModel.methods.updateDeliveryConfirmation = async function(
    confirmedBy,
    isConfirmed
) {

    console.log("started")
    console.log(this)
    if (confirmedBy === "rider") {
        this.deliveryConfirmation.riderConfirmed = isConfirmed;
    } else if (confirmedBy === "user") {
        this.deliveryConfirmation.userConfirmed = isConfirmed;
    }

    if (this.isDeliveryConfirmed()) {
        this.status = "delivered";
        this.deliveryConfirmation.confirmedAt = new Date();
    }

    return this.save();
};

module.exports = mongoose.model("Order", OrderModel);