import mongoose from "mongoose";
import courseSchema from "./schema.js";
const courseModel = mongoose.model("CourseModel", courseSchema);
export default courseModel;

