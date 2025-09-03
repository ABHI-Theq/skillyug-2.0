import React, { useState, useEffect } from 'react';
import { Search, Filter, Clock, Users, Star, BookOpen } from 'lucide-react';
import useCourse from '../hooks/useCourse'; // adjust path to your hook
import { useNavigate } from 'react-router-dom';

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { courses, loading, error, fetchCourses } = useCourse();
  const navigate = useNavigate();

  const categories = [
    { id: 'all', name: 'All Courses' },
    { id: 'programming', name: 'Programming' },
    { id: 'development', name: 'Development' },
    { id: 'devops', name: 'Devops' },
    { id: 'business', name: 'Business' }
  ];

  // Fetch courses when component mounts
  useEffect(() => {
    fetchCourses();
  }, []);

  // Apply search + category filter
  const filteredCourses = courses.filter(course => {
    const matchesSearch =
      course.course_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || course.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Courses
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Choose from hundreds of courses taught by industry experts
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-black/30 backdrop-blur-md border border-blue-800/30 rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-blue-900/30 border border-blue-800/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-3 bg-blue-900/30 border border-blue-800/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id} className="bg-gray-800">
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Loading & Error States */}
        {loading && <p className="text-center text-gray-400">Loading courses...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Course Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div
              key={course._id}
              className="bg-black/30 backdrop-blur-md border border-blue-800/30 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
            >
              {/* Use default image if none */}
              <img
                src={course.image_url || "https://via.placeholder.com/400x200.png?text=Course+Image"}
                alt={course.course_name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded text-xs font-medium">
                    {course.level || "Beginner"}
                  </span>
                  <span className="text-2xl font-bold text-orange-500">
                    ₹{course.price}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{course.course_name}</h3>
                <p className="text-gray-300 mb-4">by {course.instructor}</p>

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

                <button 
                onClick={() => navigate(`/course/${course._id}`)}
                className="w-full py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors duration-200">
                  Course Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 && !loading && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-400 mb-2">No courses found</h3>
            <p className="text-gray-500">Try adjusting your search terms or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
