import { Router } from "express";
import {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse} from "../controllers/CourseController" // adjust path if needed

const router = Router();

/**
 * @route   POST /api/courses
 * @desc    Create a new course
 * @access  Public (can add middleware like auth if needed)
 */
router.post("/new", createCourse);

/**
 * @route   GET /api/courses
 * @desc    Get all courses
 * @access  Public
 */
router.get("/", getCourses);

/**
 * @route   GET /api/courses/:id
 * @desc    Get a single course by ID
 * @access  Public
 */
router.get("/:id", getCourseById);

/**
 * @route   PUT /api/courses/:id
 * @desc    Update a course by ID
 * @access  Public (protect with auth in real apps)
 */
router.put("/:id", updateCourse);

/**
 * @route   DELETE /api/courses/:id
 * @desc    Delete a course by ID
 * @access  Public
 */
router.delete("/:id", deleteCourse);

export default router;
