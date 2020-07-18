import { combineReducers } from "redux";
import dataTypeReducers from "../reducers/dataType.reducer";
import displayReducers from "../reducers/display.reducer";
import colorArrayReducers from "../reducers/color.reducer";
import loadingReducers from "../reducers/loading.reducer";

const rootReducer = combineReducers({
  dataTypeReducers,
  displayReducers,
  colorArrayReducers,
  loadingReducers,
});

export default rootReducer;
