import express from "express";

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public")); 
//app.use(cors());

app.get("/", (req, res) => res.redirect("/index.html"));

app.listen(3000, function () {
    console.log("Listening on port 3000...");
});