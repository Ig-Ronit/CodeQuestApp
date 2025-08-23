const questionreducer = (state = { data: [] }, action) => {
  switch (action.type) {
    case "POST_QUESTION":
      return { ...state, data: action.payload };

    case "FETCH_ALL_QUESTIONS":
      console.log("Action Payload for FETCH_ALL_QUESTIONS:", action.payload);
      const newState = { ...state, data: action.payload };
      console.log("Updated State in Reducer:", newState);
      return newState;

    case "POST_ANSWER":
      return {
        ...state,
        data: state.data.map((question) =>
          question._id === action.payload._id ? action.payload : question
        ),
      };

    case "DELETE_QUESTION":
      return {
        ...state,
        data: state.data.filter((question) => question._id !== action.payload),
      };

    case "UPDATE_VOTE":
      return {
        ...state,
        data: state.data.map((question) =>
          question._id === action.payload._id ? action.payload : question
        ),
      };

    default:
      return state;
  }
};

export default questionreducer;
