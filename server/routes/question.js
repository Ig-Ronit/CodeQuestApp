import express from "express";
import Question from "../models/Question.js";
import auth from "../middleware/auth.js";
import { getallquestions } from "../controller/Question.js";
import { votequestion } from "../controller/Question.js";

const router = express.Router();

// Route to post a new question
// In routes/question.js
router.post("/Ask", auth, async (req, res) => {
  try {
    const { questiontitle, questionbody, questiontags } = req.body;

    // Using req.userId as a string in userposted
    const newQuestion = new Question({
      questiontitle,
      questionbody,
      questiontags,
      userposted: req.userId, // Assuming req.userId is a string
    });

    const savedQuestion = await newQuestion.save();
    res.status(201).json(savedQuestion);
  } catch (error) {
    console.error("Error posting question:", error.message);
    res.status(400).json({ message: "Error posting question" });
  }
});

router.get("/get", getallquestions);
router.patch("/vote/:id", auth, votequestion);

export default router;
