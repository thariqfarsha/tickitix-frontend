import { combineReducers } from "redux";
import movie from "./movie";
import schedule from "./schedule";

export default combineReducers({
  movie,
  schedule
});
