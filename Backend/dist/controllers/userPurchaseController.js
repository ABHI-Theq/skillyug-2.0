"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserPurchases = exports.checkPurchaseStatus = exports.savePurchase = void 0;
const userPurchaseModel_1 = require("../model/userPurchaseModel");
// Save a course purchase for a user
const savePurchase = async (req, res) => {
    try {
        const { userId, courseId, paymentRef } = req.body;
        if (!userId || !courseId || !paymentRef) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields: userId, courseId, paymentRef",
            });
        }
        let userPurchase = await userPurchaseModel_1.UserPurchase.findOne({ userId });
        if (!userPurchase) {
            // First purchase for this user
            userPurchase = await userPurchaseModel_1.UserPurchase.create({
                userId,
                purchasedCourses: [{ courseId, paymentRef }],
            });
        }
        else {
            // Check if already purchased
            const alreadyPurchased = userPurchase.purchasedCourses.some((c) => c.courseId.toString() === courseId);
            if (!alreadyPurchased) {
                userPurchase.purchasedCourses.push({
                    courseId,
                    paymentRef,
                    purchasedAt: new Date(),
                });
                await userPurchase.save();
            }
        }
        res.status(200).json({
            success: true,
            message: "Purchase saved successfully",
            data: userPurchase,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Error saving purchase",
            error: err.message,
        });
    }
};
exports.savePurchase = savePurchase;
// Check if user purchased a course
const checkPurchaseStatus = async (req, res) => {
    try {
        const { userId, courseId } = req.params;
        const userPurchase = await userPurchaseModel_1.UserPurchase.findOne({ userId });
        const purchased = userPurchase?.purchasedCourses.some((c) => c.courseId.toString() === courseId);
        res.status(200).json({ success: true, purchased: !!purchased });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Error checking purchase status",
            error: err.message,
        });
    }
};
exports.checkPurchaseStatus = checkPurchaseStatus;
// Get all purchased courses of a user
const getUserPurchases = async (req, res) => {
    try {
        const { userId } = req.params;
        const userPurchase = await userPurchaseModel_1.UserPurchase.findOne({ userId })
            .populate("purchasedCourses.courseId"); // populate full course details if needed
        if (!userPurchase) {
            return res.status(404).json({
                success: false,
                message: "No purchases found for this user",
            });
        }
        res.status(200).json({
            success: true,
            data: userPurchase.purchasedCourses,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Error fetching user purchases",
            error: err.message,
        });
    }
};
exports.getUserPurchases = getUserPurchases;
