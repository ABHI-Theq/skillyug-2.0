import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/purchase";

export default function usePurchase() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Save purchase after payment success
  const savePurchase = async (userId, courseId, paymentRef) => {
    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/save`, {
        userId,
        courseId,
        paymentRef,
      });
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save purchase");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Check if user has purchased a course
  const checkPurchaseStatus = async (userId, courseId) => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/status/${userId}/${courseId}`);
      return res.data.purchased;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to check purchase status");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Fetch all purchases for a user
  const getUserPurchases = async (userId) => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/user/${userId}`);
      return res.data.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch purchases");
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    savePurchase,
    checkPurchaseStatus,
    getUserPurchases,
  };
}
