import * as dao from "./dao.js";

export default function EnrollmentRoutes(app) {

app.post("/api/enrollments/:userId/courses/:courseId/enroll", async (req, res) => {
    const { userId, courseId } = req.params;
    
    dao.enrollUserInCourse(userId, courseId);
    res.json({ message: `User ${userId} enrolled in ${courseId}`});
});

app.delete("/api/enrollments/:userId/courses/:courseId/unEnroll", async (req, res) => {
    console.log(`Request received to unenroll user ${req.params.userId} from course ${req.params.courseId}`);

    const { userId , courseId } = req.params;

    dao.unEnrollInCourse(userId, courseId);
    res.json({message: `User ${userId} unenrolled in ${courseId}`});
});

};
