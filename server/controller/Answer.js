import question from "../models/Question.js";

export const postanswer = async (req, res) => {
  const { answerbody, useranswered } = req.body;
  const { id } = req.params;

  console.log("Received answer:", answerbody);
  console.log("Question ID:", id);

  try {
    const questionData = await question.findById(id);
    if (!questionData) {
      console.error("Question not found with ID:", id);
      return res.status(404).json({ message: "Question not found" });
    }

    const newAnswer = {
      answerbody,
      answeredon: new Date(),
      userid: req.userId,
      useranswered, // This is now the user's name
    };

    questionData.answers.push(newAnswer);
    questionData.noofanswers += 1;

    await questionData.save();
    console.log("Updated question with new answer:", questionData);
    res.status(200).json(questionData);
  } catch (error) {
    console.error("Error posting answer:", error);
    res.status(500).json({ message: "Error posting answer" });
  }
};

export const deleteanswer = async (req, res) => {
  const { answerid, noofanswers } = req.body;
  const questionId = req.params.id;
  console.log('Delete Answer Debug:', { answerid, noofanswers, questionId });

  try {
    const q = await question.findById(questionId);
    if (!q) {
      console.error('Delete Answer Debug: Question not found', questionId);
      return res.status(404).json({ message: "Question not found" });
    }

    const answerIndex = q.answers.findIndex(
      (answer) => answer._id.toString() === answerid
    );
    console.log('Delete Answer Debug: answerIndex', answerIndex);
    if (answerIndex !== -1) {
      q.answers.splice(answerIndex, 1);
      q.noofanswers = Math.max(q.noofanswers - 1, 0);
      await q.save();
      res.status(200).json(q);
    } else {
      console.error('Delete Answer Debug: Answer not found', answerid);
      return res.status(404).json({ message: "Answer not found" });
    }
  } catch (error) {
    console.error("Error deleting answer:", error);
    res.status(500).json({ message: "Error deleting answer", error: error.message, stack: error.stack });
  }
};
