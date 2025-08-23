import express from "express";
import { postanswer, deleteanswer } from "../controller/Answer.js";
import auth from "../middleware/auth.js";
const router = express.Router();

// Route for posting an answer
router.post("/post/:id", auth, postanswer);

// Route for deleting an answer
router.delete("/question/:id/answer", auth, deleteanswer);

export default router;
