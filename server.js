import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import session from "express-session";
import bodyParser from "body-parser";
import Task from "./models/Task.js";
import User from "./models/User.js";

dotenv.config();
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Session for authentication
app.use(session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false
}));

// Ensure MONGO_URI is loaded from .env
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error("❌ MONGO_URI is not defined! Check your .env file.");
    process.exit(1);
}

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// Show Home Page (Login + To-Do List)
app.get("/", async (req, res) => {
    let user = null;
    let tasks = [];
    let page = parseInt(req.query.page) || 1; // Get page number from query params

    if (req.session.userId) {
        user = await User.findById(req.session.userId);
        if (user) {
            tasks = await Task.find({ userId: user._id });
        }
    }

    res.render("index", { user, tasks, page });
});

// Signup
app.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;
    
    try {
        // Store password in plain text (Not recommended for production)
        const user = new User({ name, email, password });
        await user.save();
        req.session.userId = user._id;
        req.session.userName = user.name;
        res.redirect("/");
    } catch (err) {
        res.status(400).send("Email already in use.");
    }
});

// Login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
        return res.status(401).send("Invalid login credentials.");
    }
    
    req.session.userId = user._id;
    req.session.userName = user.name;
    res.redirect("/");
});

// Logout
app.post("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
});

// Add Task
app.post("/add", async (req, res) => {
    if (!req.session.userId) return res.redirect("/");
    
    const task = new Task({
        userId: req.session.userId,
        description: req.body.description
    });

    await task.save();
    res.redirect("/");
});

// Complete Task
app.post("/complete/:id", async (req, res) => {
    if (!req.session.userId) return res.redirect("/");
    
    await Task.findOneAndUpdate({ _id: req.params.id, userId: req.session.userId }, { completed: true });
    res.redirect("/");
});

// Delete Task
app.post("/delete/:id", async (req, res) => {
    if (!req.session.userId) return res.redirect("/");
    
    await Task.findOneAndDelete({ _id: req.params.id, userId: req.session.userId });
    res.redirect("/");
});

// Start Server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});