import * as api from "../api";
export const fetchallusers = () => async (dispatch) => {
  try {
    const { data } = await api.getallusers();
    // console.log("Fetching users:", data);
    dispatch({ type: "FETCH_USERS", payload: data });
  } catch (error) {
    console.log("Error Fetching Users", error);
  }
};

export const updateprofile = (id, updatedata) => async (dispatch) => {
  try {
    const { data } = await api.updateprofile(id, updatedata);
    dispatch({ type: "UPDATE_CURRENT_USER", payload: data });
  } catch (error) {
    console.log(error);
  }
};
