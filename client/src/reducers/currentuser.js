const currentuserreducer = (state = null, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return action.payload;
    case "LOGOUT":
      return null;
    default:
      return state;
  }
};

export default currentuserreducer;
