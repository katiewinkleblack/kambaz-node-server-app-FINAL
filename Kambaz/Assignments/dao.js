
import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";


export function findAssignmentsForCourse(courseId) {
  const { assignments } = Database;
  return assignments.filter((a) => a.course === courseId);
}

export function createAssignment(assignment) {
    const newAssignment = { ...assignment, _id: uuidv4() };
    Database.assignments = [...Database.assignments, newAssignment];
    return newAssignment;
  }

  export function deleteAssignment(aid) {
    const { assignments } = Database;
    Database.assignments = assignments.filter((a) => a._id !== aid);
   }

   export function updateAssignment(aid, assignmentUpdates) {
    const { assignments } = Database;
    const assignment = assignments.find((assignment) => assignment._id === aid);
    Object.assign(assignment, assignmentUpdates);
    return assignment;
  }
  