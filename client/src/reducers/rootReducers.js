import { combineReducers } from "redux";
import usersreducer from "./users";
import currentuserreducer from "./currentuser";
import questionreducer from "./question";

const rootReducer = combineReducers({
  currentuserreducer,
  usersreducer,
  questionreducer,
});

export default rootReducer;
