import { Schema, model, Document } from "mongoose";

// Interface for TypeScript
export interface IUserPurchase extends Document {
  userId: string; // Supabase user ID (UUID)
  purchasedCourses: {
    courseId: Schema.Types.ObjectId;
    paymentRef: string;
    purchasedAt: Date;
  }[];
}

// Schema
const userPurchaseSchema = new Schema<IUserPurchase>(
  {
    userId: {
      type: String, // Supabase User UUID
      required: true,
      unique: true,
    },
    purchasedCourses: [
      {
        courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
        paymentRef: { type: String, required: true }, // razorpay_payment_id
        purchasedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

// Model
export const UserPurchase = model<IUserPurchase>(
  "UserPurchase",
  userPurchaseSchema
);
