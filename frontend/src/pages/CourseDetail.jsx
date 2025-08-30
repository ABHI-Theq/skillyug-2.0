import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Play, Clock, Users, CheckCircle, BookOpen, Award, Download } from "lucide-react";
import { checkoutHandler } from "../hooks/checkoutHandlers";
import useCourse from "../hooks/useCourse";
import usePurchase from "../hooks/usePurchase";
import { useAuth } from "../hooks/AuthContext";

function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getCourseById, loading, error } = useCourse();
  const { checkPurchaseStatus } = usePurchase();

  const [course, setCourse] = useState(null);
  const [purchased, setPurchased] = useState(false);

  useEffect(() => {
    const fetchCourseAndStatus = async () => {
      const data = await getCourseById(id);
      setCourse(data);

      // Check purchase status only if logged in
      const { user } = useAuth();
      if (user && id) {
        const isPurchased = await checkPurchaseStatus(user.id, id);
        setPurchased(isPurchased);
      }
    };

    fetchCourseAndStatus();
  }, [id]);

  if (loading) return <p className="text-center text-gray-400 mt-10">Loading course...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  if (!course) return <p className="text-center text-gray-400 mt-10">Course not found</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 via-blue-900 to-black">
      {/* Header */}
      <div className="text-center py-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-white">{course.course_name}</h1>
        <p className="text-lg text-gray-300 mt-2">by {course.instructor}</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Section */}
        <div className="lg:col-span-2">
          {/* Course Image */}
          <div className="relative bg-black/30 backdrop-blur-md border border-blue-800/30 rounded-2xl overflow-hidden shadow-lg mb-8">
            <img
              src={course.image_url || "https://via.placeholder.com/800x400.png?text=Course+Image"}
              alt={course.course_name}
              className="w-full h-64 sm:h-80 object-cover opacity-90"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="bg-orange-500/90 p-4 rounded-full text-white shadow-lg hover:bg-orange-600 transition">
                <Play className="h-8 w-8 ml-1" />
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="bg-black/30 backdrop-blur-md border border-blue-800/30 rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">About this course</h2>
            <p className="text-lg text-gray-300 leading-relaxed">{course.description}</p>
          </div>

          {/* What You'll Learn */}
          <div className="bg-black/30 backdrop-blur-md border border-blue-800/30 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-semibold text-orange-400 mb-4">What you'll learn</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "Hands-on projects and assignments",
                "Understand fundamentals and advanced concepts",
                "Practical applications of the subject",
                "Industry best practices",
                "Certificate of completion",
              ].map((item, index) => (
                <div key={index} className="flex items-start text-gray-300">
                  <CheckCircle className="h-5 w-5 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Instructor */}
          <div className="bg-black/30 backdrop-blur-md border border-blue-800/30 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-orange-400 mb-4">Your Instructor</h3>
            <div className="flex items-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-blue-900 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                {course.instructor.charAt(0)}
              </div>
              <div>
                <h4 className="font-semibold text-white">{course.instructor}</h4>
                <p className="text-gray-400">Expert Instructor in {course.category}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Payment Card */}
        <div className="lg:col-span-1">
          <div className="bg-black/30 backdrop-blur-md border border-blue-800/30 rounded-2xl shadow-xl overflow-hidden sticky top-6">
            <div className="p-6 border-b border-blue-800/30 text-center">
              <span className="text-3xl font-bold text-orange-500">₹{course.price}</span>
              <p className="text-gray-400 mt-2">One-time payment</p>

              {purchased ? (
                <button
                  onClick={() => navigate(`/mycourses/${course._id}`)}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-4 px-6 rounded-xl mt-6 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Go to Course
                </button>
              ) : (
                <button
                  onClick={() => checkoutHandler(course.price, course._id)}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-4 px-6 rounded-xl mt-6 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Enroll Now - Pay ₹{course.price}
                </button>
              )}

              <div className="text-sm text-gray-500 mt-4">30-day money-back guarantee</div>
            </div>

            <div className="p-6">
              <h4 className="text-lg font-semibold text-orange-400 mb-4">This course includes:</h4>
              <div className="space-y-3 text-gray-300">
                {[
                  { icon: Clock, text: "Lifetime access" },
                  { icon: Download, text: "Downloadable resources" },
                  { icon: BookOpen, text: "Access on mobile & desktop" },
                  { icon: Award, text: "Certificate of completion" },
                  { icon: Users, text: "Community access" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <item.icon className="h-5 w-5 mr-3 text-orange-500" />
                    <span className="text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-950 p-6 text-center">
              <p className="text-sm text-gray-400">Rated 4.8/5 by 2,000+ students</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
