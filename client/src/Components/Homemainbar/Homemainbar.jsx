// components/Homemainbar.jsx
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchallquestion } from "../../action/question";
import Questionlist from "./Questionlist";
import "./Homemainbar.css";

function Homemainbar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.currentuserreducer);
  const location = useLocation();
  const navigate = useNavigate();
  const questionlist = useSelector(
    (state) => state.questionreducer?.data || []
  );
  // console.log("Questions from Redux state:", questionlist);
  useEffect(() => {
    dispatch(fetchallquestion());
  }, [dispatch]);

  const checkauth = () => {
    if (user === null) {
      alert("Login or signup to ask a question");
      navigate("/Auth");
    } else {
      navigate("/Askquestion");
    }
  };

  return (
    <div className="main-bar">
      <div className="main-bar-header">
        {location.pathname === "/" ? (
          <h1>Top Question</h1>
        ) : (
          <h1>All Question</h1>
        )}
        <button className="ask-btn" onClick={checkauth}>
          Ask Questions
        </button>
      </div>
      <div>
        {questionlist.length > 0 ? (
          <>
            <p>Questions Asked : {questionlist.length} </p>
            <Questionlist questionlist={questionlist} />
          </>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </div>
  );
}

export default Homemainbar;
