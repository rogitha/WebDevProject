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

//THIS WILL HAVE TO CHANGE
//Need to use s_id to grab the classes, but haven't implemented caching that information yet
studentRouter.get("/info/:f_name", async (req, res) => {
    try{
        const classes = await db.getStudentClasses(s_id);
        res.json(classes);
    } catch (error){
        res.status(500).json({ error: "Failed to get student classes"});
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