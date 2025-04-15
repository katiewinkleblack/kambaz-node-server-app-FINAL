
import enrollmentModel from "./model.js";



export async function enrollUserInCourse(userId, courseId) {
  const courseObjectId = new mongoose.Types.ObjectId(courseId);
  
  const existing = await enrollmentModel.findOne({
    user: userId,
    course: courseObjectId,
  });

  if (existing) {
    console.log("User is already enrolled in this course.");
    return existing;
  }

  const enrollment = await enrollmentModel.create({
    user: username,
    course: courseObjectId,
  });
  return enrollment
};



export async function unEnrollInCourse (userId, courseId) {
  const courseObjectId = new mongoose.Types.ObjectId(courseId);
  
  const result = await enrollmentModel.deletOne({
    user: userId,
    course: courseObjectId,
  });

  if (result.deletedCount === 0) {
    console.log(`Could not unenroll ${userId}`);
  }
  else {
    console(`Un-enrolled ${userId}`);
  }
  return result;
};

export async function findEnrolledCourses (username) {
  
  const enrollments = await enrollmentModel.find({
    user: username }).populate("course");

    return enrollments.map((e) => e.course);
  };

  export const findEnrollements = () =>
    enrollmentModel.find();