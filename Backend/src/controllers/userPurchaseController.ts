import { Request, Response } from "express";
import { UserPurchase } from "../model/userPurchaseModel";

// Save a course purchase for a user
export const savePurchase = async (req: Request, res: Response) => {
  try {
    const { userId, courseId, paymentRef } = req.body;

    if (!userId || !courseId || !paymentRef) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: userId, courseId, paymentRef",
      });
    }

    let userPurchase = await UserPurchase.findOne({ userId });

    if (!userPurchase) {
      // First purchase for this user
      userPurchase = await UserPurchase.create({
        userId,
        purchasedCourses: [{ courseId, paymentRef }],
      });
    } else {
      // Check if already purchased
      const alreadyPurchased = userPurchase.purchasedCourses.some(
        (c) => c.courseId.toString() === courseId
      );

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
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error saving purchase",
      error: (err as Error).message,
    });
  }
};

// Check if user purchased a course
export const checkPurchaseStatus = async (req: Request, res: Response) => {
  try {
    const { userId, courseId } = req.params;

    const userPurchase = await UserPurchase.findOne({ userId });

    const purchased = userPurchase?.purchasedCourses.some(
      (c) => c.courseId.toString() === courseId
    );

    res.status(200).json({ success: true, purchased: !!purchased });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error checking purchase status",
      error: (err as Error).message,
    });
  }
};
// Get all purchased courses of a user
export const getUserPurchases = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
  
      const userPurchase = await UserPurchase.findOne({ userId })
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
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Error fetching user purchases",
        error: (err as Error).message,
      });
    }
  };
