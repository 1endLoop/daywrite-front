import { combineReducers } from "redux";
import count from "./count/count";
import user from "./user/user";

const rootReducer = combineReducers({
  count,
  user
})

export default rootReducer;