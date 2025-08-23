import * as api from "../api";
import { setcurrentuser } from "./currentuser";
import { fetchallusers } from "./users";

export const signup = (authdata, naviagte) => async (dispatch) => {
  try {
    const { data } = await api.signup(authdata);
    dispatch({ type: "AUTH", data });
    dispatch(setcurrentuser(JSON.parse(localStorage.getItem("Profile"))));
    dispatch(fetchallusers());
    naviagte("/");
  } catch (error) {
    console.log(error);
  }
};
export const login = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.login(authData);
    const { token, result } = data;

    // Save the token in localStorage
    localStorage.setItem("Token", token);
    localStorage.setItem("Profile", JSON.stringify({ result, token }));

    // Dispatch an action to Redux
    dispatch({ type: "AUTH", payload: { result, token } });

    // Navigate to the homepage or dashboard
    navigate("/");
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
  }
};

export const logout = () => (dispatch) => {
  try {
    localStorage.removeItem("Profile");
    localStorage.removeItem("Token");
    dispatch({ type: "LOGOUT" });
  } catch (error) {
    console.error("Logout Error:", error);
  }
};
