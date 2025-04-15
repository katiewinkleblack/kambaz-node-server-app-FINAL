
import * as dao from "./dao.js";

export default function AssignmentRoutes(app) {

    app.get("/api/course/:courseId/assignments", async (req,res) => {
        const { courseId } = req.params;
        const assignments = await dao.findAssignmentsForCourse(courseId);
        res.json(assignments);
    });

    app.delete("/api/assignments/:aid", async (req, res) => {
        const { aid } = req.params;
        const status = await dao.deleteAssignment(aid);
        res.send(status);
     });
     
     app.put("/api/assignments/:aid", async (req, res) => {
        const { aid } = req.params;
        const assignmentUpdates = req.body;
        const status = await dao.updateAssignment(aid, assignmentUpdates);
        res.json(status);
        res.send(status);
      });
    

}