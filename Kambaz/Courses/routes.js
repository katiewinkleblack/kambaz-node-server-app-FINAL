
import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";
import * as AssignmentDao from "../Assignments/dao.js";
import * as enrollmentDao from "../Enrollments/dao.js";


export default function CourseRoutes(app) {

 
  app.get("/api/courses", async (req, res) => {
    const courses = await dao.findAllCourses();
    console.log(courses);
    res.send(courses);
  });

app.get("api/users/:username/courses", async (req, res) => {
    const { username } = req.params;
    console.log("📥 Received userId for course fetch:", username);
    const enrolledCourses = await dao.findCoursesForEnrolledUsers(username);
    res.json(enrolledCourses);
});

app.post("/api/courses", async (req, res) => {

  try {
    const newCourse = await dao.createCourse(req.body); 
    const currentUser = req.session["currentUser"];
    if (currentUser) {
      await enrollmentDao.enrollUserInCourse(currentUser.username, newCourse._id);
    }
    res.json(newCourse);
  } catch (error) {
    console.error("Error creating course" , error);
    res.status(500).json({ error: "Failed to create course" });
  }
})

app.get("/api/courses/:courseId/modules", async (req, res) => {
    const { courseId } = req.params;
    const modules = await modulesDao.findModulesForCourse(courseId);
    res.json(modules);
  });

  app.get("/api/courses/:courseId/assignments", async (req, res) => {
    const { courseId } = req.params;
    const assignments = await AssignmentDao.findAssignmentsForCourse(courseId);
    res.json(assignments);
  });



  app.post("/api/courses/:courseId/modules", async (req, res) => {
    const { courseId } = req.params;
    const module = {
      ...req.body,
      course: courseId,
    };
    const newModule = await modulesDao.createModule(module);
    console.log("✅ Created module:", newModule);
    res.send(newModule);
  });

  app.post("/api/courses/:courseId/assignments", async (req, res) => {
    const { courseId } = req.params;
    const assignment = {
      ...req.body,
      course: courseId,
    };
    console.log("Received Assignment:", assignment); 

    const newAssignment = await AssignmentDao.createAssignment(assignment);
    console.log("Created Assignment:", newAssignment); 

    res.send(newAssignment);
  });

  app.delete("/api/courses/:courseId", async (req, res) => {
    const { courseId } = req.params;
    const status = await dao.deleteCourse(courseId);
    res.send(status);
 });
 
 app.put("/api/courses/:courseId", async (req, res) => {
    const { courseId } = req.params;
    const courseUpdates = req.body;
    const status = await dao.editCourse(courseId, courseUpdates);
    res.send(status);
  });

  const findUsersForCourse = async (req, res) => {
    const { cid } = req.params;
    const users = await enrollmentDao.findUsersForCourse(cid);
    res.json(users);
  };
  app.get("/api/courses/:cid/users", findUsersForCourse);

}
