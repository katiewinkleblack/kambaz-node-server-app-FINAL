import * as dao from "./dao.js";

export default function EnrollmentRoutes(app) {

app.post("/api/enrollments/:userId/courses/:courseId/enroll", async (req, res) => {
    const { userId, courseId } = req.params;
    
    try {
        const enrollment = await dao.enrollUserInCourse(userId, courseId);
        res.json(enrollment);
} catch (error) {
    console.error("Error enrolled:", userId);
    res.status(500).json({ error: "Failled to enroll"});
}
});

app.delete("/api/enrollments/:userId/courses/:courseId/unEnroll", async (req, res) => {
    const { userId , courseId } = req.params;

    try {
    const results = dao.unEnrollInCourse(userId, courseId);

    if (results.deletedCount === 0) {
        res.status(500).json({ error: "Failled to unenroll"});
    } else {
    res.json({message: `User ${userId} unenrolled in ${courseId}`});
    }
} catch (error) {
    console.error("Could not unenroll:", userId);
    res.status(500).json({ error: "Failled to unenroll"});
}
});



app.get("/api/users/:userId/courses", async (req, res) => {
    const { userId } = req.params;
    try {
      const courses = await dao.findCoursesForEnrolledUser(userId);
      res.json(courses);
    } catch (err) {
      res.status(500).json({ error: "Failed to retrieve enrolled courses" });
    }
  });
};
  