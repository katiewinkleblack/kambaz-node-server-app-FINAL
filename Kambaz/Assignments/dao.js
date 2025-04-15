
import assignmentModel from "./model.js";
import { v4 as uuidv4 } from "uuid";


export function findAssignmentsForCourse(courseId) {
  return assignmentModel.find({ course: courseId });
}

export function createAssignment(assignment) {
    const newAssignment = { ...assignment, _id: `A-${uuidv4()}` };
    return assignmentModel.create(newAssignment);
  }

  export function deleteAssignment(aid) {
    return assignmentModel.deleteOne({ _id: aid});
   }

   export function updateAssignment(aid, assignmentUpdates) {
    return assignmentModel.findByIdAndUpdate(aid, assignmentUpdates, 
      {new: true});
  }
  