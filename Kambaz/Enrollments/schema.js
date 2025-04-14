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
    enrolledOn: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "enrollments" }
);

export default enrollmentSchema;
