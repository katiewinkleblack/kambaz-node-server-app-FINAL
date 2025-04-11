
import * as dao from "./dao.js";
import * as courseDao from "../Courses/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

export default function UserRoutes(app) {
 
  const updateUser = async (req, res) => { 
    const { username } = req.params;
    const userUpdates = req.body;

    try { 
    await dao.updateUser(userId, userUpdates);
    const currentUser = await dao.findUserById(userId);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
    } catch (error) {
      res.status(500).json({ error: "Failed to update,", error});
    }
  };

  const signup = async (req, res) => { 
  try {
    const user = await dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json(
        { message: "Username already in use" });
      return;
    }
    const currentUser = await dao.createUser(req.body);   
    req.session["currentUser"] = currentUser;                 
    res.json(currentUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to Signup,", error});
  }
  };

  const signin = async (req, res) => {
    const { username, password } = req.body;
  const userDoc = await dao.findUserByCredentials(username, password);
  console.log("🔍 Raw userDoc:", userDoc);


  if (!userDoc) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  const user = {
    ...userDoc.toObject(),
    _id: userDoc._id?.toString() || null, 
  };

  console.log("✅ currentUser ID:", user._id);

  console.log("Logged in user:", user);

  req.session["currentUser"] = user;

  req.session.save((err) => {
    if (err) {
      console.error("Error saving session:", err);
      return res.status(500).json({ error: "Session save failed" });
    }

    console.log("💾 Session saved");
    res.json(user);
  });
};


  const signout = async (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
   };


   const profile = async (req, res) => {
    console.log("/api/users/profile HIT");
  console.log("Session:", req.session);
  console.log("Current user in session:", req.session["currentUser"]);

  const currentUser = req.session["currentUser"];

  if (!currentUser) {
    console.log("No currentUser in session");
    return res.status(401).json({ error: "No active session" });
  }

  const userProfile = await dao.findUserById(currentUser._id);


  res.json(userProfile);
  
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

    try {
    const courses = await courseDao.findCoursesForEnrolledUser(userId);
    res.json(courses);
    } catch (error) {
      res.status(500).json({ error: "Failed to Find Course,", error});
    }
  };


  const createCourse = async (req, res) => {
    const currentUser = req.session["currentUser"];

    try {
    const newCourse = await courseDao.createCourse(req.body);
    await enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
    
    res.json(newCourse);
    } catch (error) {
      res.status(500).json({ error: "Failed to Create Course,", error});
    }
  };


  app.post("/api/users/current/courses", createCourse);

 

  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);

  app.post("/api/users", async (req, res) => {
    try {
      const userData = {...req.body};
      delete userData._id;

      const user = await dao.createUser(req.body);
      
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to Post Users,", error});
    }
  });

  app.get("/api/users", async (req, res) => {
    try {
      const users = await dao.findAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Failed to Get Users,", error});
    }
  });

  app.get("/api/users/:userId", async (req, res) => {
    try {
      const user = await dao.findUserById(req.params.userId);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to Get Users", error});
    }
  });
    
  app.put("/api/users/:userId", updateUser);

  app.delete("/api/users/:userId", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    await dao.deleteUser(id);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ error: "Failed to Delete Users,", error});
  }
});


  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);

  app.post("/api/users/profile", profile);
  console.log("🔥 /api/users/profile was hit");
}
