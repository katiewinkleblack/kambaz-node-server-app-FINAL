
import mongoose from "mongoose";
import enrollmentSchema from "./schema.js";

const enrollmentModel = mongoose.model("EnrollmentModel", enrollmentSchema);

export default enrollmentModel;
