import { combineReducers } from "redux";
import movie from "./movie";
import schedule from "./schedule";
import user from "./user";
import booking from "./booking";

export default combineReducers({
  movie,
  schedule,
  user,
  booking
});
