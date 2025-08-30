"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCourse = exports.updateCourse = exports.getCourseById = exports.getCourses = exports.createCourse = void 0;
const courseModel_1 = __importStar(require("../model/courseModel"));
/**
 * @desc    Create a new course
 * @route   POST /api/courses
 */
const createCourse = async (req, res) => {
    try {
        const { course_name, token, price, instructor, description, image_url, category } = req.body;
        // Step 1: Validate required fields
        if (!course_name || !token || !price || !instructor || !image_url || !category) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields: course_name, token, price, instructor, image_url, category",
            });
        }
        // Step 2: Validate category against enum
        if (!Object.values(courseModel_1.Category).includes(category)) {
            return res.status(400).json({
                success: false,
                message: `Invalid category. Allowed values are: ${Object.values(courseModel_1.Category).join(", ")}`,
            });
        }
        // Step 3: Create course in DB
        const course = await courseModel_1.default.create({
            course_name,
            token,
            price,
            image_url,
            instructor,
            description,
            category,
        });
        res.status(201).json({
            success: true,
            message: "Course created successfully",
            data: course,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error while creating course",
            error: error.message,
        });
    }
};
exports.createCourse = createCourse;
/**
 * @desc    Get all courses
 * @route   GET /api/courses
 */
const getCourses = async (_req, res) => {
    try {
        const courses = await courseModel_1.default.find();
        res.status(200).json({
            success: true,
            count: courses.length,
            data: courses,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error while fetching courses",
            error: error.message,
        });
    }
};
exports.getCourses = getCourses;
/**
 * @desc    Get single course by ID
 * @route   GET /api/courses/:id
 */
const getCourseById = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await courseModel_1.default.findById(id);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: `No course found with ID: ${id}`,
            });
        }
        res.status(200).json({
            success: true,
            data: course,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while fetching course by ID",
            error: error.message,
        });
    }
};
exports.getCourseById = getCourseById;
/**
 * @desc    Update course by ID
 * @route   PUT /api/courses/:id
 */
const updateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const { course_name, token, price, instructor, description, image_url, category } = req.body;
        const existingCourse = await courseModel_1.default.findById(id);
        if (!existingCourse) {
            return res.status(404).json({
                success: false,
                message: `No course found with ID: ${id}`,
            });
        }
        // Update only provided fields
        if (course_name)
            existingCourse.course_name = course_name;
        if (token)
            existingCourse.token = token;
        if (price)
            existingCourse.price = price;
        if (instructor)
            existingCourse.instructor = instructor;
        if (description)
            existingCourse.description = description;
        if (image_url)
            existingCourse.image_url = image_url;
        if (category) {
            if (!Object.values(courseModel_1.Category).includes(category)) {
                return res.status(400).json({
                    success: false,
                    message: `Invalid category. Allowed values are: ${Object.values(courseModel_1.Category).join(", ")}`,
                });
            }
            existingCourse.category = category;
        }
        const updatedCourse = await existingCourse.save();
        res.status(200).json({
            success: true,
            message: "Course updated successfully",
            data: updatedCourse,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Error while updating course",
            error: error.message,
        });
    }
};
exports.updateCourse = updateCourse;
/**
 * @desc    Delete course by ID
 * @route   DELETE /api/courses/:id
 */
const deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await courseModel_1.default.findByIdAndDelete(id);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: `No course found with ID: ${id}`,
            });
        }
        res.status(200).json({
            success: true,
            message: "Course deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while deleting course",
            error: error.message,
        });
    }
};
exports.deleteCourse = deleteCourse;
