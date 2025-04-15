import * as dao from "./dao.js";

export default function EnrollmentRoutes(app) {

app.post("/api/enrollments/:username/courses/:courseId/enroll", async (req, res) => {
    const { username, courseId } = req.params;
    
    try {
        console.log("🟢 Received enrollment request:", { username, courseId });

        const enrollment = await dao.enrollUserInCourse(username, courseId);

        console.log("✅ Enrollment saved:", enrollment);

        res.json(enrollment);
} catch (error) {
    console.error("Error enrolled:", username);
    res.status(500).json({ error: "Failled to enroll"});
}
});

app.delete("/api/enrollments/:username/courses/:courseId/unEnroll", async (req, res) => {
    const { username , courseId } = req.params;

    try {
    const results = dao.unEnrollInCourse(username, courseId);

    if (results.deletedCount === 0) {
        res.status(500).json({ error: "Failled to unenroll"});
    } else {
    res.json({message: `User ${username} unenrolled in ${courseId}`});
    }
} catch (error) {
    console.error("Could not unenroll:", username);
    res.status(500).json({ error: "Failled to unenroll"});
}
});


  app.get("/api/enrollments", async (req, res) => {
    const courses = await dao.findEnrollements();
    console.log(courses);
    res.send(courses);
  });


};