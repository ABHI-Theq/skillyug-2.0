"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userPurchaseController_1 = require("../controllers/userPurchaseController");
const router = express_1.default.Router();
// Save a purchase (called after successful payment)
router.post("/save", userPurchaseController_1.savePurchase);
// Check if a specific course is purchased
router.get("/status/:userId/:courseId", userPurchaseController_1.checkPurchaseStatus);
// Get all purchased courses of a user
router.get("/user/:userId", userPurchaseController_1.getUserPurchases);
exports.default = router;
