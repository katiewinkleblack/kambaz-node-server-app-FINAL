
import * as dao from "./dao.js";
import * as courseDao from "../Courses/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

export default function UserRoutes(app) {
 
  const updateUser = async (req, res) => { 
    const userId = req.params.userId;
    const userUpdates = req.body;

    await dao.updateUser(userId, userUpdates);
    const currentUser = await dao.findUserById(userId);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };

  const signup = async (req, res) => { 
    const user = await dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json(
        { message: "Username already in use" });
      return;
    }
    const currentUser = await dao.createUser(req.body);   
    req.session["currentUser"] = currentUser;                 
    res.json(currentUser);
  };

  const signin = async (req, res) => {
    const {username, password} = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);
    if (currentUser) {
        req.session["currentUser"] = currentUser;
        res.json(currentUser);
    } else {
        res.status(401).json({ message: "Unable to login. Try again later." });
      }
  
   };


  const signout = async (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
   };


   const profile = async (req, res) => {
      const currentUser = await req.session["currentUser"];

    if (!currentUser) {
      console.log("ERROR")
      return res.status(401).json({ error: "No active session. Please log in." });
    
    }

  try {
    const userProfile = await dao.findUserById(currentUser._id);

    if (!userProfile) {
      return res.status(404).json({ error: "User Not Found" });
    }
    res.json(userProfile);
  } catch (error) {
    return res.status(500).json({ error: "Internal Service Problem" });
  }

   
  };
  

   const findCoursesForEnrolledUser = async (req, res) => {
    let { userId } = req.params;
    if (userId === "current") {
      const currentUser = await req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const courses = await courseDao.findCoursesForEnrolledUser(userId);
    res.json(courses);
  };

  const createCourse = (req, res) => {
    const currentUser = req.session["currentUser"];
    const newCourse = courseDao.createCourse(req.body);
    enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
    res.json(newCourse);
  };

  app.post("/api/users/current/courses", createCourse);



  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);

  app.post("/api/users", dao.createUser);
  app.get("/api/users", dao.findAllUsers);
  app.get("/api/users/:userId", dao.findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", dao.deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);

  app.post("/api/users/profile", profile);
}
