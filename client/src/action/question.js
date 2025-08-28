import * as api from "../api";

export const askquestion = (questiondata, navigate) => async (dispatch) => {
  try {
    const { data } = await api.postquestion(questiondata);
    dispatch({ type: "POST_QUESTION", payload: data });
    dispatch(fetchallquestion());
    navigate("/");
  } catch (error) {
    throw new Error(`Error posting question: ${error.message}`);
  }
};

export const fetchallquestion = () => async (dispatch) => {
  try {
    const { data } = await api.getallquestions();
    dispatch({ type: "FETCH_ALL_QUESTIONS", payload: data });
  } catch (error) {
    throw new Error(`Error fetching questions: ${error.message}`);
  }
};

export const deletequestion = (id, navigate) => async (dispatch) => {
  try {
    await api.deletequestion(id);
    dispatch({
      type: "DELETE_QUESTION",
      payload: id,
    });
    navigate("/");
  } catch (error) {
    throw new Error(`Error deleting question: ${error.message}`);
  }
};

export const votequestion = (id, value) => async (dispatch) => {
  try {
    const { data } = await api.votequestion(id, value);
    dispatch({ type: "UPDATE_VOTE", payload: data });
  } catch (error) {
    throw new Error(`Error updating vote: ${error.message}`);
  }
};

export const postanswer =
  (questionId, { noofanswers, answerbody, useranswered, userid }) =>
    async (dispatch) => {
      try {
        const response = await api.postanswer(questionId, {
          answerbody,
          useranswered,
          userid,
          noofanswers,
        });
        dispatch(fetchallquestion());
        return response;
      } catch (error) {
        throw new Error(`Error posting answer: ${error.message}`);
      }
    };

export const deleteanswer =
  (questionId, answerId, noofanswers) => async (dispatch) => {
    try {
      await api.deleteanswer(questionId, answerId, noofanswers);
      dispatch(fetchallquestion());
    } catch (error) {
      throw new Error(`Error deleting answer: ${error.message}`);
    }
  };
