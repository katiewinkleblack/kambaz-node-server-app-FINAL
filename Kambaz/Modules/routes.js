
import * as dao from "./dao.js";

export default function ModuleRoutes(app) {
    app.get("/api/course/:courseId/modules", async (req,res) => {
        const { courseId } = req.params;
        const modules = await dao.findModulesForCourse(courseId);
        res.json(modules);
    });

    app.delete("/api/modules/:moduleId", async (req, res) => {
        const { moduleId } = req.params;
        const status = await dao.deleteModule(moduleId);
        res.send(status);
     });
     
     app.put("/api/modules/:moduleId", async (req, res) => {
        const { moduleId } = req.params;
        const moduleUpdates = req.body;
        const status = await dao.updateModule(moduleId, moduleUpdates);
        res.send(status);
      });
    
}