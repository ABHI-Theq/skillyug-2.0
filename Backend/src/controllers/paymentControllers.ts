import crypto from "crypto";
import { Payment } from "../model/paymentModel";
import { instance } from "../index.js";
import { Request, Response } from "express";
import mongoose from "mongoose";

// ✅ Checkout Controller
export const checkout = async (req: Request, res: Response) => {
  try {
    const { amount, courseId } = req.body;

    if (!amount || isNaN(amount)) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing amount",
      });
    }

    if (!courseId || !mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing courseId",
      });
    }

    const options = {
      amount: Number(amount) * 100, // amount in paise
      currency: "INR",
    };

    const order = await instance.orders.create(options);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error creating Razorpay order",
      error: (err as Error).message,
    });
  }
};

// ✅ Payment Verification Controller
export const paymentVerification = async (req: Request, res: Response) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, courseId } =
      req.body;

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Missing Razorpay payment details",
      });
    }

    if (!courseId || !mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing courseId",
      });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET as string)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      await Payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        courseId,
      });

      // redirect to frontend with reference
      return res.redirect(
        `http://localhost:5173/paymentsuccess?reference=${razorpay_payment_id}&courseId=${courseId}`
      );
    } else {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error verifying payment",
      error: (err as Error).message,
    });
  }
};
