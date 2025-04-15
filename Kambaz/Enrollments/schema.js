import "../Courses/model.js";
import "../Users/model.js";
import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
  {
    user: {
        type: String,
        ref: "UserModel",
        required: true,
      },
    course: {
      type: String,
      ref: "CourseModel",
      required: true,
    },
    grade: Number,
    letterGrade: String,
    enrollmentDate: Date,
    status: {
      type: String,
      enum: ["ENROLLED", "DROPPED", "COMPLETED"],
      default: "ENROLLED",
    },
  }, 
  { collection: "enrollments" }
);

export default enrollmentSchema;
