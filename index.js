import express from 'express';
import Hello from "./Hello.js";
import Lab5 from './Lab5/index.js';
import CourseRoutes from "./Kambaz/Courses/routes.js";
import cors from "cors";
import UserRoutes from './Kambaz/Users/routes.js';
import session from 'express-session';
import ModuleRoutes from './Kambaz/Modules/routes.js';
import AssignmentRoutes from './Kambaz/Assignments/routes.js';
import EnrollmentRoutes from './Kambaz/Enrollments/routes.js';
import PeopleRoutes from './Kambaz/People/routes.js';
import mongoose from 'mongoose';
import MongoStore from "connect-mongo";
import * as dao from "./Kambaz/Users/dao.js";


import dotenv from "dotenv"; 
dotenv.config(); 

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;
mongoose.connect(CONNECTION_STRING)
.then(async () => {
  console.log('Connected to MongoDB successfully')
const testUser = await dao.findUserByCredentials("dark_knight", "wayne123");
if (testUser) {
  console.log("🧪 Found test user in database:", testUser.username);
} else {
  console.log("❌ Could NOT find 'dark_knight' in connected database.");
}
});

const app = express();
app.use(express.json());

app.use(
    cors({
        credentials: true,
        origin: [ process.env.NETLIFY_URL, "https://a6--kanbaz-react-web-app-cs4550-sp25.netlify.app"],
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "production") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
  };
}
  app.use(session(sessionOptions));
  
Lab5(app);
Hello(app);
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
EnrollmentRoutes(app);
PeopleRoutes(app);

app.listen(process.env.PORT || 4000);
console.log("NODE_ENV =", process.env.NODE_ENV);
