import mongoose from "mongoose";
import Question from "./models/Question.js";
import User from "./models/auth.js";

const runTest = async () => {
  try {
    // Connect to your MongoDB database
    await mongoose.connect(
      "mongodb+srv://admin:test@cluster0.vdvzr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    // Fetch questions and populate userposted field
    const populatedQuestions = await Question.find()
      .populate("userposted", "name")
      .exec();

    console.log("Populated Questions:", populatedQuestions);

    // Disconnect from the database
    mongoose.disconnect();
  } catch (error) {
    console.error("Error:", error.message);
  }
};

runTest();
