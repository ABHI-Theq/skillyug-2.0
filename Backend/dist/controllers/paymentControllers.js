"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentVerification = exports.checkout = void 0;
const crypto_1 = __importDefault(require("crypto"));
const paymentModel_1 = require("../model/paymentModel");
const index_js_1 = require("../index.js");
const checkout = async (req, res) => {
    const options = {
        amount: Number(req.body.amount) * 100,
        currency: "INR"
    };
    const order = await index_js_1.instance.orders.create(options);
    res.status(200).json({
        // id:order._id,
        success: "true",
        order
    });
};
exports.checkout = checkout;
const paymentVerification = async (req, res) => {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
    console.log(req.body);
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto_1.default.
        createHmac('sha256', process.env.RAZORPAY_SECRET).
        update(body.toString()).
        digest('hex');
    const isAuthentic = expectedSignature === razorpay_signature;
    if (isAuthentic) {
        await paymentModel_1.Payment.create({
            razorpay_order_id: razorpay_order_id,
            razorpay_payment_id: razorpay_payment_id,
            razorpay_signature: razorpay_signature
        });
        res.redirect(`http://localhost:5173/paymentsuccess?reference=${razorpay_payment_id}` //replace with your frontend url 
        );
    }
    else {
        res.status(400).json({
            success: "false",
            payment: "failed"
        });
    }
};
exports.paymentVerification = paymentVerification;
