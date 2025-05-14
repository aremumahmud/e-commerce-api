const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Rider = require("../db/rider");
const Order = require("../db/Models/order.Model");
const { authenticateToken } = require("../middleware/auth");

// Rider registration
router.post("/register", async(req, res) => {
    try {
        const { name, phoneNumber, address, email, password } = req.body;

        // Check if rider already exists
        const existingRider = await Rider.findOne({
            $or: [{ email }, { phoneNumber }],
        });
        if (existingRider) {
            return res.status(400).json({
                message: "Rider already exists with this email or phone number",
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new rider
        const rider = new Rider({
            name,
            phoneNumber,
            address,
            email,
            password: hashedPassword,
        });

        await rider.save();

        // Generate JWT token
        const token = jwt.sign({ riderId: rider._id, email: rider.email },
            process.env.JWT_SECRET, { expiresIn: "24h" }
        );

        res.status(201).json({
            message: "Rider registered successfully",
            rider: {
                id: rider._id,
                name: rider.name,
                email: rider.email,
                phoneNumber: rider.phoneNumber,
            },
            token,
        });
    } catch (error) {
        console.log(error)
        res
            .status(500)
            .json({ message: "Error registering rider", error: error.message });
    }
});

// Rider login
router.post("/login", async(req, res) => {
    try {
        const { email, password } = req.body;

        // Find rider
        const rider = await Rider.findOne({ email });
        if (!rider) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, rider.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ riderId: rider._id, email: rider.email },
            process.env.JWT_SECRET, { expiresIn: "24h" }
        );

        res.json({
            message: "Login successful",
            rider: {
                id: rider._id,
                name: rider.name,
                email: rider.email,
                phoneNumber: rider.phoneNumber,
            },
            token,
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
});

// Get available orders
router.get("/available-orders", authenticateToken, async(req, res) => {
    try {
        const availableOrders = await Order.find({
            status: "processing",
            "rider.riderId": { $exists: false },
        });

        res.json({
            message: "Available orders retrieved successfully",
            orders: availableOrders,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving available orders",
            error: error.message,
        });
    }
});

// Accept an order
router.post("/orders/:orderId/accept", authenticateToken, async(req, res) => {
    try {
        const { orderId } = req.params;
        const riderId = req.user.riderId;

        console.log(orderId, riderId)
            // Check if rider is available
        const rider = await Rider.findById(riderId);
        if (!rider.isAvailable) {
            return res.status(400).json({ message: "Rider is not available" });
        }

        // Update order with rider information
        const order = await Order.findByIdAndUpdate(
            orderId, {
                status: "assigned",
                "rider.riderId": riderId,
                "rider.assignedAt": new Date(),
                "rider.acceptedAt": new Date(),
            }, { new: true }
        );

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // Update rider's availability
        await rider.assignOrder(orderId);

        res.json({
            message: "Order accepted successfully",
            order,
        });
    } catch (error) {
        res
            .status(500)
            .json({ message: "Error accepting order", error: error.message });
    }
});

// Confirm delivery
router.post(
    "/orders/:orderId/confirm-delivery",
    authenticateToken,
    async(req, res) => {
        try {
            const { orderId } = req.params;
            const riderId = req.user.riderId;

            console.log(orderId)
            console.log(riderId)
                // Find the order
            const order = await Order.findById(orderId);
            if (!order) {
                return res.status(404).json({ message: "Order not found" });
            }

            console.log(JSON.stringify(order))

            // Verify that the rider is assigned to this order
            if (order.rider.riderId.toString() !== riderId) {
                return res
                    .status(403)
                    .json({ message: "Not authorized to confirm this delivery" });
            }
            console.log("yuo")
                // Update delivery confirmation
            await order.updateDeliveryConfirmation("rider", true);
            console.log('smear')
                // If both parties have confirmed, update rider's status
            if (order.isDeliveryConfirmed()) {
                const rider = await Rider.findById(riderId);
                await rider.completeOrder();
            }

            res.json({
                message: "Delivery confirmation updated successfully",
                order,
            });
        } catch (error) {
            console.log(error)
            res
                .status(500)
                .json({ message: "Error confirming delivery", error: error.message });
        }
    }
);

// Get rider's current order
router.get("/current-order", authenticateToken, async(req, res) => {
    try {
        const riderId = req.user.riderId;
        const rider = await Rider.findById(riderId).populate("currentOrder");
        // console.log(rider)
        if (!rider.currentOrder) {
            return res.json({ message: "No current order", order: null });
        }

        res.json({
            message: "Current order retrieved successfully",
            order: rider.currentOrder,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving current order",
            error: error.message,
        });
    }
});

module.exports = router;