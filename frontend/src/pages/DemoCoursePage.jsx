import React from 'react';
import { Play, Clock, Users, CheckCircle, Star, BookOpen, Award, Download } from 'lucide-react';
import axios from 'axios';
import { checkoutHandler } from '../hooks/checkoutHandlers';

function DemoCoursePage() {

    
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-900">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-orange-500" />
              <span className="ml-2 text-xl font-bold text-gray-900">EduCourse</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">
                Courses
              </button>
              <button className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">
                About
              </button>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Course Content - Left Side */}
          <div className="lg:col-span-2">
            {/* Course Video/Thumbnail */}
            <div className="relative bg-blue-900 rounded-2xl overflow-hidden shadow-2xl mb-8">
              <img 
                src="https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Course thumbnail"
                className="w-full h-64 sm:h-80 object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="bg-orange-500/90 backdrop-blur-sm hover:bg-orange-600/90 text-white p-4 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg">
                  <Play className="h-8 w-8 ml-1" />
                </button>
              </div>
              <div className="absolute bottom-4 left-4">
                <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Preview Available
                </span>
              </div>
            </div>

            {/* Course Title and Description */}
            <div className="mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Complete React Development Bootcamp
              </h1>
              <p className="text-lg text-orange-100 leading-relaxed mb-6">
                Master modern React development from basics to advanced concepts. Build real-world projects, 
                learn best practices, and become a confident React developer. This comprehensive course covers 
                everything you need to know to start your journey as a professional React developer.
              </p>
              
              {/* Course Stats */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-orange-200">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>12 hours of content</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  <span>2,847 students</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-2 text-orange-400 fill-current" />
                  <span>4.8 (342 reviews)</span>
                </div>
                <div className="flex items-center">
                  <Award className="h-4 w-4 mr-2" />
                  <span>Certificate included</span>
                </div>
              </div>
            </div>

            {/* What You'll Learn */}
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg mb-8 border border-orange-200">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">What you'll learn</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "Build modern React applications from scratch",
                  "Master React Hooks and functional components",
                  "State management with Redux and Context API",
                  "Create responsive and accessible user interfaces",
                  "Testing React applications with Jest",
                  "Deploy React apps to production",
                  "Performance optimization techniques",
                  "Best practices for clean code"
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructor Info */}
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-orange-200">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">Your Instructor</h3>
              <div className="flex items-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-blue-900 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  JS
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900">John Smith</h4>
                  <p className="text-gray-600">Senior React Developer & Instructor</p>
                  <p className="text-sm text-gray-500 mt-1">5 years teaching experience • 50,000+ students</p>
                </div>
              </div>
            </div>
          </div>

          {/* Course Purchase Card - Right Side */}
          <div className="lg:col-span-1">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden sticky top-6 border border-orange-200">
              {/* Price Section */}
              <div className="p-6 border-b border-orange-100">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center mb-2">
                    <span className="text-3xl font-bold text-blue-900">₹89</span>
                    <span className="text-lg text-gray-500 line-through ml-2">₹199</span>
                  </div>
                  <span className="bg-orange-100 text-orange-800 text-sm font-medium px-3 py-1 rounded-full">
                    55% Off - Limited Time
                  </span>
                </div>

                <button onClick={()=>{
                  checkoutHandler(89)
                }} className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mb-4">
                  Enroll Now - Pay Course Fee
                </button>

                <div className="text-center text-sm text-gray-500 mb-4">
                  30-day money-back guarantee
                </div>

                <button className="w-full border-2 border-orange-200 hover:border-orange-300 text-blue-900 font-medium py-3 px-6 rounded-xl transition-colors hover:bg-orange-50">
                  Add to Wishlist
                </button>
              </div>

              {/* Course Includes */}
              <div className="p-6">
                <h4 className="font-semibold text-blue-900 mb-4">This course includes:</h4>
                <div className="space-y-3">
                  {[
                    { icon: Clock, text: "12 hours on-demand video" },
                    { icon: Download, text: "15 downloadable resources" },
                    { icon: BookOpen, text: "Access on mobile and desktop" },
                    { icon: Award, text: "Certificate of completion" },
                    { icon: Users, text: "Community access" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center text-gray-600">
                      <item.icon className="h-5 w-5 mr-3 text-orange-500" />
                      <span className="text-sm">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust Signals */}
              <div className="bg-orange-50 p-6">
                <div className="text-center">
                  <div className="flex justify-center items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-orange-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">
                    Rated 4.8/5 by 2,847 students
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-orange-200">© 2025 EduCourse. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default DemoCoursePage;