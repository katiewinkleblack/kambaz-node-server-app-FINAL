import db from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";


export function findPeopleForCourse(courseId) {
  const { users, enrollments } = db;
  console.log("hi");
  return users.filter((user) => 
    enrollments.some((enrollment) => enrollment.user === user._id && enrollment.course === courseId));


}

 export function AddPersonToCourse(userId, courseId) {
    const { users, enrollments } = db;
    const user = users.find((user) => user._id === userId);
    if (!user) {
        throw new Error("User not Found");
    }

    const isEnrolled = enrollments.some((e) => e.user === user._id && 
    e.course === courseId);

    if (isEnrolled) {
        throw new Error('User is already enrolled in this course');
    }

    enrollments.push({ _id: uuidv4(), user: userId, course: courseId });
    return {
        message: 'User Successfully Added to Course',
        user,
        courseId
    };
  };
  
  export function DeletePersonFromCourse(userId, courseId) {
    const { users, enrollments } = db;
    const user = users.find((user) => user._id === userId);

    if (!user) {
        throw new Error("User not Found");
    }

    const index = enrollments.findIndex((e) => e.user === userId && e.course === courseId);

    if (index === -1) {
        throw new Error("User is not in this Course");
    }
        enrollments.splice(index, 1);

        return {
            message: "User removed from COurse",
            user,
            courseId
        };

  }
