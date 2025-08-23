import Question from "../models/Question.js";
import mongoose from "mongoose";
import User from "../models/auth.js";

export const Askquestion = async (req, res) => {
  try {
    const { questiontitle, questionbody, questiontags } = req.body;
    const userId = req.userId;

    // Check if required fields are missing
    if (!questiontitle || !questionbody || !questiontags || !userId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Fetch the user from the User collection
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create the new question
    const newQuestion = new Question({
      questiontitle: title,
      questionbody: body,
      questiontags: tags,
      userposted: user._id, // Use the ObjectId here
      userid: userId,
      askedon: new Date(),
    });
    console.log("New Question to be saved:", newQuestion);
    // Save the new question to the database
    await newQuestion.save();
    console.log("Saved Question:", newQuestion);
    res.status(201).json(newQuestion);
  } catch (error) {
    console.error("Error in Askquestion:", error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getallquestions = async (req, res) => {
  try {
    const questions = await Question.find()
      .populate("userposted", "name")
      .exec();

    res.status(200).json(questions); // Send the response
  } catch (error) {
    console.error("Error fetching questions:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const deletequestion = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Question unavailable...");
  }
  try {
    await Question.findByIdAndDelete(_id);
    res.status(200).json({ message: "Successfully deleted..." });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const votequestion = async (req, res) => {
  const { id: _id } = req.params;
  const { value } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Question unavailable...");
  }

  try {
    const question = await Question.findById(_id);

    if (!question) {
      return res.status(404).send("Question not found");
    }

    // Update upvote or downvote
    if (value === 1) {
      question.upvote.push(req.userid);
    } else if (value === -1) {
      question.downvote.push(req.userid);
    }

    // Save the updated question
    const updatedQuestion = await question.save();

    // Populate the userposted field
    const populatedQuestion = await Question.findById(
      updatedQuestion._id
    ).populate(
      "userposted", // Ensure this matches your Mongoose schema field
      "name" // Fields to include
    );

    res.status(200).json(populatedQuestion);
  } catch (error) {
    res.status(500).json({ message: "Error updating vote" });
  }
};
