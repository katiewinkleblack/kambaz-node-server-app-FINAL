
import assignmentModel, * as AssignmentModel from "./model.js";


export function findAssignmentsForCourse(courseId) {
  return AssignmentModel.find({ courseId});
}

export function createAssignment(assignment) {
    const newAssignment = { ...assignment, _id: uuidv4() };
    return AssignmentModel.createAssignment(newAssignment);
  }

  export function deleteAssignment(aid) {
    return assignmentModel.deleteOne({ _id: aid});
   }

   export function updateAssignment(aid, assignmentUpdates) {
    return assignmentModel.findByIdAndUpdate(aid, assignmentUpdates, 
      {new: true});
  }
  