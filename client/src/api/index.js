import axios from "axios";

// Use environment variable or fallback to localhost
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://codequestapp.onrender.com",
});

// Adding interceptors to include the Authorization token in requests
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("Token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;

// Auth API calls
export const login = (authdata) => API.post("/user/login", authdata);
export const signup = (authdata) => API.post("/user/signup", authdata);

// User API calls
export const getallusers = () => API.get("/user/getallusers");
export const updateprofile = (id, updatedata) =>
  API.patch(`/user/update/${id}`, updatedata);

// Questions API calls
export const postquestion = (questiondata) =>
  API.post("/questions/Ask", questiondata);
export const getallquestions = () => API.get("/questions/get");
export const deletequestion = (id) => API.delete(`/questions/delete/${id}`);
export const votequestion = (id, value) =>
  API.patch(`/questions/vote/${id}`, { value });

// Answer API calls
export const postanswer = (id, answerdata) =>
  API.post(`/answer/post/${id}`, answerdata);

export const deleteanswer = (id, answerid, noofanswers) =>
  API.delete(`/answer/question/${id}/answer`, {
    data: { answerid, noofanswers },
  });
