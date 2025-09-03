import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";
import usePurchase from "../hooks/usePurchase";

const PaymentSuccess = () => {
  const searchQuery = useSearchParams()[0];
  const referenceNum = searchQuery.get("reference"); 
  const courseId = searchQuery.get("courseId");      
  const navigate = useNavigate();
  const { user } = useAuth();

  const { savePurchase } = usePurchase();

  useEffect(() => {
    const handleSave = async () => {
      try {

        await savePurchase(user.id, courseId, referenceNum);

        setTimeout(() => {
          if (courseId) navigate(`/course/${courseId}`);
          else navigate("/");
        }, 3000);
      } catch (err) {
        console.error("Error saving purchase:", err);
      }
    };

    if (referenceNum && courseId) {
      handleSave();
    }
  }, [referenceNum, courseId, navigate, supabase, savePurchase]);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
        gap: 2,
      }}
    >
      <Typography variant="h4" sx={{ textTransform: "uppercase", fontWeight: "bold" }}>
        Order Successful 🎉
      </Typography>

      <Typography variant="body1">Reference No. {referenceNum}</Typography>

      <Typography variant="body2" sx={{ mt: 2, color: "gray" }}>
        Redirecting you back to the course page...
      </Typography>
    </Box>
  );
};

export default PaymentSuccess;
