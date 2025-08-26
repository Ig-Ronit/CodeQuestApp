import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const Question = ({ question }) => {
  const votes =
    (question.upvote?.length || 0) - (question.downvote?.length || 0);
  const answers = question.noofanswers || 0;
  const tags = question.questiontags || [];
  const askedOn = question.askedon || new Date();
  const username = question.userposted?.name || "Anonymous";

  const maxLength = window.innerWidth <= 400 ? 70 : 90;
  const title =
    question.questiontitle.length > maxLength
      ? question.questiontitle.substring(0, maxLength) + "..."
      : question.questiontitle;

  return (
    <div className="display-question-container">
      <div className="display-votes-ans">
        <p>{votes}</p>
        <p>Votes</p>
      </div>
      <div className="display-votes-ans">
        <p>{answers}</p>
        <p>Answers</p>
      </div>
      <div className="display-question-details">
        <Link to={`/Question/${question._id}`} className="question-title-link">
          {title}
        </Link>
        <div className="display-tags-time">
          <div className="display-tags">
            {tags.map((tag) => (
              <p key={tag}>{tag}</p>
            ))}
          </div>
          <p className="display-time">
            {moment(askedOn).fromNow()} By {username}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Question;
