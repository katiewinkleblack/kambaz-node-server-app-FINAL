import * as dao from "./dao.js";

export default function PeopleRoutes(app) {

    app.get("/api/courses/:courseId/people", (req,res) => {
        const {courseId } = req.params;
        console.log("Fetching People for", courseId);
        const people = dao.findPeopleForCourse(courseId);
        console.log("PEOPLLE found", people);
        res.json(Array.isArray(people) ? people : []);
    });

    app.post("/api/courses/:courseId/people", (req, res) => {
        const { courseId } = req.params;
        const { userId } = req.body;

        console.log("Received POST request:", { courseId, userId });


        if (!courseId || !userId) {
            return res.status(400).json({ message: "Missing courseId or userId"});
        }

        try {
            const result = dao.AddPersonToCourse(userId, courseId);
            res.status(200).json(result);
        } catch (error) {
            console.log("Error in AddPersonToCourse:", error.message);
            res.status(400).json({ message: error.message });
        }
    });

app.delete("/api/courses/:courseId/people", async (req, res) => {
        const { courseId } = req.params;
        const { userId } = req.body;

        if (!courseId || !userId) {
            return res.status(400).json({ message: "Missing courseId or userId"});
        }
        try {
        const result =  dao.DeletePersonFromCourse(userId, courseId);
        res.status(200).json(result);
        } catch (error) {
            res.status(400).json({message: error.message});
        }
     });

};