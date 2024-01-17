import mongoose from "mongoose";

const courseCollection = "course";
const CourseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
});

export const CourseModel = mongoose.model(courseCollection, CourseSchema);