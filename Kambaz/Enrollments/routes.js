import * as dao from "./dao.js";

export default function EnrollmentRoutes(app) {

app.post("/api/enrollments/:username/courses/:courseId/enroll", async (req, res) => {
    const { userId, courseId } = req.params;
    
    try {
        console.log("🟢 Received enrollment request:", { username, courseId });

        const enrollment = await dao.enrollUserInCourse(userId, courseId);

        console.log("✅ Enrollment saved:", result);

        res.json(enrollment);
} catch (error) {
    console.error("Error enrolled:", userId);
    res.status(500).json({ error: "Failled to enroll"});
}
});

app.delete("/api/enrollments/:username/courses/:courseId/unEnroll", async (req, res) => {
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


  app.get("/api/enrollments", async (req, res) => {
    const courses = await dao.findEnrollements();
    console.log(courses);
    res.send(courses);
  });


};