import mongoose from "mongoose";
import courseSchema from "./schema.js";
const courseModel = mongoose.model("CourseSchema", courseSchema);
export default courseModel;

