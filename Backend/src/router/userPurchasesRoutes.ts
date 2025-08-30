import express from "express";
import { savePurchase, checkPurchaseStatus, getUserPurchases } from "../controllers/userPurchaseController";

const router = express.Router();

// Save a purchase (called after successful payment)
router.post("/save", savePurchase);

// Check if a specific course is purchased
router.get("/status/:userId/:courseId", checkPurchaseStatus);

// Get all purchased courses of a user
router.get("/user/:userId", getUserPurchases);

export default router;
