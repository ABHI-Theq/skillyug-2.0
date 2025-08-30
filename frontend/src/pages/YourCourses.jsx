import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import usePurchase from "../hooks/usePurchase";
import { BookOpen, Users, Clock, Star } from "lucide-react";

function YourCourses() {
  const supabase = useSupabaseClient();
  const { getUserPurchases, loading, error } = usePurchase();
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPurchases = async () => {
      // ✅ Get logged-in user from Supabase
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // ✅ Fetch purchases from backend
      const purchases = await getUserPurchases(user.id);
      setPurchasedCourses(purchases || []);
    };

    fetchPurchases();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-400 mt-10">Loading your courses...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-950 via-blue-900 to-black">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Your Courses</h1>

        {/* ✅ No purchases yet */}
        {purchasedCourses.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen className="h-16 w-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-2xl font-medium text-gray-300 mb-2">No courses purchased yet</h3>
            <p className="text-gray-500">Browse our catalog and start learning today 🚀</p>
          </div>
        ) : (
          // ✅ Purchased Courses Grid
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {purchasedCourses.map((purchase) => {
              const course = purchase.courseId; // comes from populate in backend
              return (
                <div
                  key={purchase._id}
                  onClick={() => navigate(`/course/${course._id}`)}
                  className="bg-black/30 backdrop-blur-md border border-blue-800/30 rounded-xl overflow-hidden hover:scale-105 transform transition duration-300 cursor-pointer"
                >
                  {/* Course Image */}
                  <img
                    src={course.image_url || "https://via.placeholder.com/400x200.png?text=Course+Image"}
                    alt={course.course_name}
                    className="w-full h-48 object-cover"
                  />

                  <div className="p-6">
                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-2">{course.course_name}</h3>
                    <p className="text-gray-300 mb-3">by {course.instructor}</p>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span>{course.rating || 4.5}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{course.students?.toLocaleString() || 0}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{course.duration || "N/A"}</span>
                      </div>
                    </div>

                    {/* Button */}
                    <button
                      onClick={() => navigate(`/course/${course._id}`)}
                      className="w-full py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors duration-200"
                    >
                      Continue Learning
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default YourCourses;
