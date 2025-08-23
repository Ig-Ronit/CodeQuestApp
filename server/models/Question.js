import mongoose from "mongoose";

const AnswerSchema = mongoose.Schema({
  answerbody: { type: String, required: true },
  useranswered: { type: String, required: true },
  userid: { type: String, required: true },
  answeredon: { type: Date, default: Date.now },
});

const QuestionSchema = mongoose.Schema(
  {
    questiontitle: { type: String, required: "Question must have a title" },
    questionbody: { type: String, required: "Question must have a body" },
    questiontags: { type: [String], required: "Question must have tags" },
    noofanswers: { type: Number, default: 0 },
    upvote: { type: [String], default: [] },
    downvote: { type: [String], default: [] },
    userposted: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    askedon: { type: Date, default: Date.now },
    answers: { type: [AnswerSchema], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model("Question", QuestionSchema);
