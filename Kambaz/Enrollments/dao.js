
import enrollmentModel from "./model.js";



export async function enrollUserInCourse(user, course) {
  const courseObjectId = new mongoose.Types.ObjectId(course);
  const userDoc = await userModel.findOne({ username: user });
    if (!userDoc) throw new Error("User not found");

const courseDoc = await courseModel.findById(course);
      if (!courseDoc) throw new Error("Course not found");

  
  const existing = await enrollmentModel.findOne({
    user: userDoc.username,
    course: courseDoc._id,
  });

  if (existing) {
    console.log("User is already enrolled in this course.");
    return existing;
  }

  const enrollment = await enrollmentModel.create({ 
    _id:`${user}-${courseObjectId}`, 
    user: userDoc.username, 
    course: userDoc._id,
   });
  return enrollment
};


export async function unEnrollInCourse (user, course) {
  const courseObjectId = new mongoose.Types.ObjectId(course);
  
  const result = await enrollmentModel.deleteOne({
    user: user,
    course: courseObjectId,
  });

  if (result.deletedCount === 0) {
    console.log(`Could not unenroll ${user}`);
  }
  else {
    console.log(`Un-enrolled ${user}`);
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