
import * as dao from "./dao.js";
import * as courseDao from "../Courses/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

export default function UserRoutes(app) {

  const findAllUsers = async (req, res) => {
    const { role, name } = req.query;
    if (role) {
      const users = await dao.findUsersByRole(role);
      res.json(users);
      return;
    }
    if (name) {
      const users = await dao.findUsersByPartialName(name);
      res.json(users);
      return;
    }
    const users = await dao.findAllUsers();
    res.json(users);
  };

  app.get("/api/users", findAllUsers);


 
  const updateUser = async (req, res) => { 
    const { username } = req.params;
    const userUpdates = req.body;

    try { 
    await dao.updateUser(username, userUpdates);
    const currentUser = req.session["currentUser"];
   
    if (currentUser && currentUser.username === username) {
      req.session["currentUser"] = { ...currrentUser, ...userUpdates}
    }
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
  };

  console.log("✅ currentUser ID:", user.username);

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

  const userProfile = await dao.findUserByUsername(currentUser.username);


  res.json(userProfile);
  
   };


   const findCoursesForEnrolledUser = async (req, res) => {
    let { username } = req.params;
    console.log(username);
    if (username === "current") {
      const currentUser = await req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      username = currentUser.username;
    }

    try {
    const courses = await courseDao.findCoursesForEnrolledUsers(username);
    res.json(courses);
    } catch (error) {
      res.status(500).json({ error: "Failed to Find Course,", error});
    }
  };


  const createCourse = async (req, res) => {
    const currentUser = req.session["currentUser"];

    try {
    const newCourse = await courseDao.createCourse(req.body);
    await enrollmentsDao.enrollUserInCourse(currentUser.username, newCourse._id);
    
    res.json(newCourse);
    } catch (error) {
      res.status(500).json({ error: "Failed to Create Course,", error});
    }
  };


  app.post("/api/users/current/courses", createCourse);

 

  app.get("/api/users/:username/courses", findCoursesForEnrolledUser);

  app.post("/api/users", async (req, res) => {
    try {
      const userData = {...req.body};
      delete userData._id;

      const user = await dao.createUser(userData);
      
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

  app.get("/api/users/:username", async (req, res) => {
    try {
      const user = await dao.findUserByUsername(req.params.username);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to Get Users", error});
    }
  });

  const findUserByUsername = async (req, res) => {
    const user = await dao.findUserByUsername(req.params.userId);
    res.json(user);
  };

  app.get("/api/users/:userId", findUserByUsername);
    
  app.put("/api/users/:username", updateUser);

  app.delete("/api/users/:username", async (req, res) => {
  try {
    const { username } = req.params;
    console.log(username);
    await dao.deleteUser(username);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ error: "Failed to Delete Users,", error});
  }
});


  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);

  app.post("/api/users/profile", profile);

app.get("/api/users/search", async (req, res) => {
  const { firstName, lastName } = req.query;
  console.log("🔍 Searching for:", firstName, lastName); 
  const user = await dao.findUserByFullName(firstName, lastName);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(user);
});



}
