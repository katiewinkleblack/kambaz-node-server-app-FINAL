// enrollmentSchema.js
import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel", 
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
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
