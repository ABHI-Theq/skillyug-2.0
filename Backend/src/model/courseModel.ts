import { Schema, model, Document } from "mongoose";

// 1. Define the categories enum
export enum Category {
  PROGRAMMING = "programming",
  DEVELOPMENT = "development",
  DEVOPS = "devops",
  BUSINESS = "business"
}

// 2. Define the interface for TypeScript
export interface ICourse extends Document {
  course_name: string;
  token: number;
  price: number;
  image_url: string;
  instructor: string;
  description: string;
  category: Category;
}

// 3. Define the Mongoose schema
const courseSchema = new Schema<ICourse>(
  {
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
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

// 4. Create the model
const Course = model<ICourse>("Course", courseSchema);

export default Course;
