import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const API_URL = "https://skillyug-2-0-backend.onrender.com/api/courses"; // change if deployed

export default function useCourse() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // -------------------
  // Fetch all courses
  // -------------------
  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(API_URL);
      setCourses(data.data || []);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // -------------------
  // Fetch course by ID
  // -------------------
  const getCourseById = useCallback(async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API_URL}/${id}`);
      setError(null);
      return data.data; // return single course
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // -------------------
  // Create new course
  // -------------------
  const createCourse = useCallback(async (course) => {
    try {
      setLoading(true);
      const { data } = await axios.post(API_URL, course, {
        headers: { "Content-Type": "application/json" },
      });
      setCourses((prev) => [...prev, data.data]);
      setError(null);
      return data.data;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // -------------------
  // Update a course
  // -------------------
  const updateCourse = useCallback(async (id, updates) => {
    try {
      setLoading(true);
      const { data } = await axios.put(`${API_URL}/${id}`, updates, {
        headers: { "Content-Type": "application/json" },
      });
      setCourses((prev) =>
        prev.map((course) => (course._id === id ? data.data : course))
      );
      setError(null);
      return data.data;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // -------------------
  // Delete a course
  // -------------------
  const deleteCourse = useCallback(async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${API_URL}/${id}`);
      setCourses((prev) => prev.filter((course) => course._id !== id));
      setError(null);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Auto-fetch courses on mount
  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return {
    courses,
    loading,
    error,
    fetchCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
  };
}
