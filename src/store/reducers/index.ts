import { combineReducers } from "redux";
import dataTypeReducers from "../reducers/dataType.reducer";
import displayReducers from "../reducers/display.reducer";
import colorArrayReducers from "../reducers/color.reducer";

const rootReducer = combineReducers({
  dataTypeReducers,
  displayReducers,
  colorArrayReducers,
});

export default rootReducer;
