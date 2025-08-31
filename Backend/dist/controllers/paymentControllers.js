"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentVerification = exports.checkout = void 0;
const crypto_1 = __importDefault(require("crypto"));
const paymentModel_1 = require("../model/paymentModel");
const index_js_1 = require("../index.js");
const mongoose_1 = __importDefault(require("mongoose"));
// ✅ Checkout Controller
const checkout = async (req, res) => {
    try {
        const { amount, courseId } = req.body;
        if (!amount || isNaN(amount)) {
            return res.status(400).json({
                success: false,
                message: "Invalid or missing amount",
            });
        }
        if (!courseId || !mongoose_1.default.Types.ObjectId.isValid(courseId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid or missing courseId",
            });
        }
        const options = {
            amount: Number(amount) * 100, // amount in paise
            currency: "INR",
        };
        const order = await index_js_1.instance.orders.create(options);
        res.status(200).json({
            success: true,
            order,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Error creating Razorpay order",
            error: err.message,
        });
    }
};
exports.checkout = checkout;
// ✅ Payment Verification Controller
const paymentVerification = async (req, res) => {
    try {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature, courseId } = req.body;
        if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: "Missing Razorpay payment details",
            });
        }
        if (!courseId || !mongoose_1.default.Types.ObjectId.isValid(courseId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid or missing courseId",
            });
        }
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto_1.default
            .createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(body.toString())
            .digest("hex");
        const isAuthentic = expectedSignature === razorpay_signature;
        if (isAuthentic) {
            await paymentModel_1.Payment.create({
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
                courseId,
            });
            // redirect to frontend with reference
            return res.redirect(`http://localhost:5173/paymentsuccess?reference=${razorpay_payment_id}&courseId=${courseId}`);
        }
        else {
            return res.status(400).json({
                success: false,
                message: "Payment verification failed",
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Error verifying payment",
            error: err.message,
        });
    }
};
exports.paymentVerification = paymentVerification;
