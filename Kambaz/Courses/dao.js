
import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";
import courseModel from "./model.js";
import enrollmentModel from "../Enrollments/model.js";


export const findAllCourses = () =>
   courseModel.find();

export const findCourseById = (id) =>
  courseModel.findById(id);

export const findCourseByDepartment = (department) =>
  courseModel.find({department});

export const findCourseByInstructor = (instructor) =>
  courseModel.find({instructor})


export const findCoursesForEnrolledUser = async (userId) => {
  try {
    const userObjectId = new mongoose.Types.ObjectId(userId);
    const enrollments = await enrollmentModel
      .find({ user: userObjectId })
      .populate("course");

    return enrollments.map((e) => e.course);
  } catch (err) {
    console.error("❌ Error in findCoursesForEnrolledUser:", err);
    throw err;
  }
};

  export const createCourse = (course) => courseModel.create(course);

  export const updateCourse = (id, course) =>
    courseModel.updateOne({_id: id}, {$set: course}).lean();

  //export function editCourse(courseId, updatedCourse) {
     //const { courses } = Database;
    //const course = courses.find((course) => course._id === courseId);
    //Object.assign(course, updatedCourse);
   // return course;
  //};

   export const deleteCourse = (id) => courseModel.deleteOne({_id: id});
 




  
  
