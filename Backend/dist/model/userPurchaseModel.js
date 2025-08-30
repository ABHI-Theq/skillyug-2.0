"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPurchase = void 0;
const mongoose_1 = require("mongoose");
// Schema
const userPurchaseSchema = new mongoose_1.Schema({
    userId: {
        type: String, // Supabase User UUID
        required: true,
        unique: true,
    },
    purchasedCourses: [
        {
            courseId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Course", required: true },
            paymentRef: { type: String, required: true }, // razorpay_payment_id
            purchasedAt: { type: Date, default: Date.now },
        },
    ],
}, { timestamps: true });
// Model
exports.UserPurchase = (0, mongoose_1.model)("UserPurchase", userPurchaseSchema);
