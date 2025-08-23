const initialState = {
  user: null,
  token: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "AUTH":
      localStorage.setItem("Profile", JSON.stringify(data));
      localStorage.setItem("Token", action.data.token);
      return {
        ...state,
        user: action.data.result,
        token: action.data.token,
      };
    case "LOGOUT":
      localStorage.removeItem("Profile");
      localStorage.removeItem("Token");
      return { ...state, user: null, token: null };
    default:
      return state;
  }
};

export default authReducer;
