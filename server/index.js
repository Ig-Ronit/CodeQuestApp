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

// CORS setup
const allowedOrigins = [
    "http://localhost:3000",               // React local dev
    "code-quest-app-ecru.vercel.app"     // replace with your deployed frontend URL
];

app.use(
    cors({
        origin: function (origin, callback) {
            // allow requests with no origin like Postman
            if (!origin) return callback(null, true);
            if (allowedOrigins.indexOf(origin) === -1) {
                const msg = "The CORS policy for this site does not allow access from the specified Origin.";
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        },
        credentials: true
    })
);

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
    .connect(database_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() =>
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        })
    )
    .catch((err) => {
        console.error("❌ MongoDB connection failed:", err.message);
    });
