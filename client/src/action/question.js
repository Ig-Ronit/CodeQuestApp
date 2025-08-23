import * as api from "../api";

export const askquestion = (questiondata, navigate) => async (dispatch) => {
  try {
    const { data } = await api.postquestion(questiondata);
    dispatch({ type: "POST_QUESTION", payload: data });
    dispatch(fetchallquestion());
    navigate("/");
  } catch (error) {
    console.log("Error posting question:", error);
  }
};

export const fetchallquestion = () => async (dispatch) => {
  try {
    const { data } = await api.getallquestions();
    console.log("API Response: ", data);
    dispatch({ type: "FETCH_ALL_QUESTIONS", payload: data });
    console.log("Dispatched FETCH_ALL_QUESTIONS with Payload:", data);
  } catch (error) {
    console.log("Error fetching Questions:", error);
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
    console.log("Error deleting question:", error);
  }
};

export const votequestion = (id, value) => async (dispatch) => {
  try {
    const { data } = await api.votequestion(id, value);
    dispatch({ type: "UPDATE_VOTE", payload: data });
  } catch (error) {
    console.error("Error updating vote: ", error);
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
        console.log("Answer post response:", response);

        dispatch(fetchallquestion());
        return response;
      } catch (error) {
        console.error(
          "Error posting answer:",
          error.response ? error.response.data : error.message
        );
        throw error;
      }
    };

export const deleteanswer =
  (questionId, answerId, noofanswers) => async (dispatch) => {
    try {
      const response = await api.deleteanswer(
        questionId,
        answerId,
        noofanswers
      );
      console.log("Delete answer response:", response);
      dispatch(fetchallquestion());
    } catch (error) {
      console.error(
        "Error deleting answer:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  };
