
import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";


export function enrollUserInCourse(userId, courseId) {
  const { enrollments } = Database;
  enrollments.push({ _id: uuidv4(), user: userId, course: courseId });
};

export function unEnrollInCourse(userId, courseId) {
  const { enrollments } = Database;
  const index = enrollments.findIndex((e) => e.user === userId && e.course === courseId);

   if (index !== -1) {
    enrollments.splice(index, 1) ;
   } else {
    console.log(`Can Not unEnroll user from course: ${courseId}`);
   }

    };
