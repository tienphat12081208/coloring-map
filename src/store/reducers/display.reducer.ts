import * as types from "../actions/display/display.constant";

const initialState: number = 2;

const dataTypeReducers = (state = initialState, action: any) => {
  switch (action.type) {
    case types.GET_VALUE_DISPLAY:
      state = action.valueDisplay;
      return state;
    default:
      return state;
  }
};
export default dataTypeReducers;
