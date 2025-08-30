import { Request, Response } from "express";
import Course, { Category } from "../model/courseModel";

/**
 * @desc    Create a new course
 * @route   POST /api/courses
 */
export const createCourse = async (req: Request, res: Response) => {
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
    if (!Object.values(Category).includes(category)) {
      return res.status(400).json({
        success: false,
        message: `Invalid category. Allowed values are: ${Object.values(Category).join(", ")}`,
      });
    }

    // Step 3: Create course in DB
    const course = await Course.create({
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while creating course",
      error: (error as Error).message,
    });
  }
};

/**
 * @desc    Get all courses
 * @route   GET /api/courses
 */
export const getCourses = async (_req: Request, res: Response) => {
  try {
    const courses = await Course.find();

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while fetching courses",
      error: (error as Error).message,
    });
  }
};

/**
 * @desc    Get single course by ID
 * @route   GET /api/courses/:id
 */
export const getCourseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id);

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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while fetching course by ID",
      error: (error as Error).message,
    });
  }
};

/**
 * @desc    Update course by ID
 * @route   PUT /api/courses/:id
 */
export const updateCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { course_name, token, price, instructor, description, image_url, category } = req.body;

    const existingCourse = await Course.findById(id);
    if (!existingCourse) {
      return res.status(404).json({
        success: false,
        message: `No course found with ID: ${id}`,
      });
    }

    // Update only provided fields
    if (course_name) existingCourse.course_name = course_name;
    if (token) existingCourse.token = token;
    if (price) existingCourse.price = price;
    if (instructor) existingCourse.instructor = instructor;
    if (description) existingCourse.description = description;
    if (image_url) existingCourse.image_url = image_url;

    if (category) {
      if (!Object.values(Category).includes(category)) {
        return res.status(400).json({
          success: false,
          message: `Invalid category. Allowed values are: ${Object.values(Category).join(", ")}`,
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
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error while updating course",
      error: (error as Error).message,
    });
  }
};

/**
 * @desc    Delete course by ID
 * @route   DELETE /api/courses/:id
 */
export const deleteCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const course = await Course.findByIdAndDelete(id);

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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while deleting course",
      error: (error as Error).message,
    });
  }
};
