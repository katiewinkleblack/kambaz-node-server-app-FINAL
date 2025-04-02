
import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";
import * as AssignmentDao from "../Assignments/dao.js";


export default function CourseRoutes(app) {

 

  app.get("/api/courses", (req, res) => {
    const courses = dao.findAllCourses();
    res.send(courses);
  });

app.get("api/users.:userId/courses", (req, res) => {
    const { userId } = req.params;
    const enrolledCourses = dao.findCoursesForEnrolledUser();
    res.json(enrolledCourses);
});

app.post("/api/courses", (req, res) => {
    const newCourse = dao.createCourse(req.body);
    res.json(newCourse);
})

app.get("/api/courses/:courseId/modules", (req, res) => {
    const { courseId } = req.params;
    const modules = modulesDao.findModulesForCourse(courseId);
    res.json(modules);
  });

  app.get("/api/courses/:courseId/assignments", (req, res) => {
    const { courseId } = req.params;
    const assignments = AssignmentDao.findAssignmentsForCourse(courseId);
    res.json(assignments);
  });



  app.post("/api/courses/:courseId/modules", (req, res) => {
    const { courseId } = req.params;
    const module = {
      ...req.body,
      course: courseId,
    };
    const newModule = modulesDao.createModule(module);
    console.log("✅ Created module:", newModule);
    console.log("📂 Database modules:", Database.modules); 
    res.send(newModule);
  });

  app.post("/api/courses/:courseId/assignments", (req, res) => {
    const { courseId } = req.params;
    const assignment = {
      ...req.body,
      course: courseId,
    };
    console.log("Received Assignment:", assignment); 

    const newAssignment = AssignmentDao.createAssignment(assignment);
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



}
