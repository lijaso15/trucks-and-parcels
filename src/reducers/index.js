import { combineReducers } from "redux";
import points from "./points";
import menu from "./menu";
import draw from "./draw";
import data from "./data";
import called from "./called";
import main from "./main";
import loading from "./loading";
import stats from "./stats";

//combine the reducers
export default combineReducers({
  points,
  menu,
  draw,
  data,
  called,
  main,
  loading,
  stats
});
