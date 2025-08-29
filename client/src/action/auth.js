import * as api from "../api";
import { setcurrentuser } from "./currentuser";
import { fetchallusers } from "./users";
import { toast } from "react-toastify";

// LOGIN
export const login = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.login(authData);
    const { token, result } = data;

    localStorage.setItem("Token", token);
    localStorage.setItem("Profile", JSON.stringify({ result, token }));

    dispatch({ type: "AUTH", payload: { result, token } });
    toast.success("Login successful!");   // ✅ success toast
    navigate("/");
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    toast.error(error.response?.data?.message || "Invalid credentials"); // ✅ proper error toast
  }
};

// SIGNUP
export const signup = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signup(authData);

    localStorage.setItem("Profile", JSON.stringify(data));

    dispatch({ type: "AUTH", data });
    dispatch(setcurrentuser(data));
    dispatch(fetchallusers());

    toast.success("Account created successfully!"); // ✅ success toast
    navigate("/");
  } catch (error) {
    console.error("Signup error:", error.response?.data || error.message);
    toast.error(error.response?.data?.message || "Signup failed"); // ✅ proper error toast
  }
};

// LOGOUT
export const logout = () => (dispatch) => {
  try {
    localStorage.removeItem("Profile");
    localStorage.removeItem("Token");
    dispatch({ type: "LOGOUT" });
    toast.info("Logged out successfully"); // ✅ info toast
  } catch (error) {
    console.error("Logout Error:", error);
    toast.error("Error while logging out");
  }
};
