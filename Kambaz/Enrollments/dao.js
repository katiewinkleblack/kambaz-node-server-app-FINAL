
import enrollmentModel from "./model.js";



export async function enrollUserInCourse(user, course) {
  
  const existing = await enrollmentModel.findOne({
    user: user,
    course: course,
  });

  if (existing) {
    console.log("User is already enrolled in this course.");
    return existing;
  }

  const enrollment = await enrollmentModel.create({ 
    user, course, _id: `${user}-${course}` });
  return enrollment
};


export async function unEnrollInCourse (user, course) {
  
  const result = await enrollmentModel.deleteOne({
    user: user,
    course: course,
  });

  if (result.deletedCount === 0) {
    console.log(`Could not unenroll ${user}`);
  }
  else {
    console(`Un-enrolled ${user}`);
  }
  return result;
};

export async function findCoursesForUser (username) {
  
  const enrollments = await enrollmentModel.find({
    user: username }).populate("course");

    return enrollments.map((e) => e.course);
  };

  export async function findUsersForCourse(courseId) {
    const enrollments = await model.find({ course: courseId }).populate("user");
    return enrollments.map((enrollment) => enrollment.user);
   }
   

  export const findEnrollements = () =>
    enrollmentModel.find();