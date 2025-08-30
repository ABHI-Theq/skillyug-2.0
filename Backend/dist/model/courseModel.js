"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const mongoose_1 = require("mongoose");
// 1. Define the categories enum
var Category;
(function (Category) {
    Category["PROGRAMMING"] = "programming";
    Category["DEVELOPMENT"] = "development";
    Category["DEVOPS"] = "devops";
    Category["BUSINESS"] = "business";
})(Category || (exports.Category = Category = {}));
// 3. Define the Mongoose schema
const courseSchema = new mongoose_1.Schema({
    course_name: { type: String, required: true },
    token: { type: Number, required: true },
    price: { type: Number, required: true },
    image_url: { type: String, required: true },
    category: {
        type: String,
        enum: Object.values(Category), // restricts to enum values
        required: true,
    },
    instructor: { type: String, required: true },
    description: { type: String, required: false },
}, {
    timestamps: true, // adds createdAt and updatedAt
});
// 4. Create the model
const Course = (0, mongoose_1.model)("Course", courseSchema);
exports.default = Course;
