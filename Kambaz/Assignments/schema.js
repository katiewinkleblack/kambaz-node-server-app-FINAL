
import mongoose from "mongoose";

const schema = new mongoose.Schema({
  _id: String,
  title: String,
  points: Number,
  availMonth: String,
  availDate: String,
  availTime: String,
  dueMonth: String,
  dueDate: String,
  dueTime: String,
  editorAvail: String,
  editorDue: String,
  course: { type: String, ref: "CourseModel" },
}, { collection: "assignments" });

export default schema;
