import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({

    _id: String,
    title: String,
    
  course: {
    type: String,
    ref: "CourseModel", 
  }
}, {
  collection: "assignments" 
});

export default assignmentSchema;