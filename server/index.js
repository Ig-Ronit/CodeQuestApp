import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userroutes from "./routes/user.js";
import questionroutes from "./routes/question.js";
import answerroutes from "./routes/answer.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Routes
app.use("/user", userroutes);
app.use("/questions", questionroutes);
app.use("/answer", answerroutes);

// Default route
app.get("/", (req, res) => {
    res.send("✅ CodeQuest backend is running!");
});

// Port + DB config
const PORT = process.env.PORT || 5000;
const database_url = process.env.MONGODB_URL;

// Database + Server start
mongoose
    .connect(database_url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() =>
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        })
    )
    .catch((err) => {
        console.error("❌ MongoDB connection failed:", err.message);
    });
