
import enrollmentModel from "./model.js";



export async function enrollUserInCourse(userId, courseId) {
  const userObjectId = new mongoose.Types.ObjectId(userId);
  const courseObjectId = new mongoose.Types.ObjectId(courseId);

  
  const existing = await enrollmentModel.findOne({
    user: userObjectId,
    course: courseObjectId,
  });

  if (existing) {
    console.log("User is already enrolled in this course.");
    return existing;
  }

  const enrollment = await enrollmentModel.create({
    user: userObjectId,
    course: courseObjectId,
  });
  return enrollment
};



export async function unEnrollInCourse (userId, courseId) {
  const userObjectId = new mongoose.Types.ObjectId(userId);
  const courseObjectId = new mongoose.Types.ObjectId(courseId);
  
  const result = await enrollmentModel.deletOne({
    user: userObjectId,
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

export async function findEnrolledCourses (userId) {
  const userObjectId = new mongoose.Types.ObjectId(userId);
  
  const enrollments = await enrollmentModel.find({
    user: userObjectId }).populate("course");

    return enrollments.map((e) => e.course);
  };