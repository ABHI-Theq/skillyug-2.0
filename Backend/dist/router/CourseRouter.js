"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CourseController_1 = require("../controllers/CourseController"); // adjust path if needed
const router = (0, express_1.Router)();
/**
 * @route   POST /api/courses
 * @desc    Create a new course
 * @access  Public (can add middleware like auth if needed)
 */
router.post("/new", CourseController_1.createCourse);
/**
 * @route   GET /api/courses
 * @desc    Get all courses
 * @access  Public
 */
router.get("/", CourseController_1.getCourses);
/**
 * @route   GET /api/courses/:id
 * @desc    Get a single course by ID
 * @access  Public
 */
router.get("/:id", CourseController_1.getCourseById);
/**
 * @route   PUT /api/courses/:id
 * @desc    Update a course by ID
 * @access  Public (protect with auth in real apps)
 */
router.put("/:id", CourseController_1.updateCourse);
/**
 * @route   DELETE /api/courses/:id
 * @desc    Delete a course by ID
 * @access  Public
 */
router.delete("/:id", CourseController_1.deleteCourse);
exports.default = router;
