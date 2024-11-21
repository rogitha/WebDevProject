import express from "express";
import db from "./db.js"

const app = express();
const studentRouter = express.Router();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public")); 
app.use("/student", studentRouter);
//app.use(cors());

app.get("/", (req, res) => res.redirect("/index.html"));

// AUTHENTICATION ENDPOINTS //
// Sign-Up Endpoint
app.post("/signup", async (req, res) => { 
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
        return res.status(400).json({ error: "Email, password, and role are required." });
    }

    try {
        // Call the DB method to handle signup logic
        const user = await db.signUp(email, password, role);

        res.status(201).json({ message: "User signed up successfully", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to sign up user" });
    }
});

// Login Endpoint
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required." });
    }

    try {
        // Call the DB method to handle login logic
        const user = await db.login(email, password);

        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: "Invalid email or password" });
    }
});

//THIS WILL HAVE TO CHANGE
//Need to use s_id to grab the classes, but haven't implemented caching that information yet
studentRouter.get("/info/:f_name", async (req, res) => {
    try{
        const info = await db.getStudentInfo(s_id);
        res.json(info);
    } catch (error){
        res.status(500).json({ error: "Failed to get info"});
    }
});

studentRouter.get("/classes/:s_id", async (req, res) => {
    try{
        const classes = await db.getStudentClasses(s_id);
        res.json(classes);
    } catch (error){
        res.status(500).json({ error: "Failed to get student classes"});
    }
});

studentRouter.get("/assignments/:c_code", async (req, res) => {
    try{
        const assignments = await db.getAllClassAssignments(c_code);
        res.json(assignments);
    } catch (error){
        res.status(500).json({ error: "Failed to get class assignments"});
    }
});

studentRouter.get("/submission/:s_id/:a_id", async (req, res) => {
    try{
        const assignments = await db.getSubmission(s_id, a_id);
        res.json(assignments);
    } catch (error){
        res.status(500).json({ error: "Failed to get class assignments"});
    }
});



app.listen(3000, function () {
    console.log("Listening on port 3000...");
});