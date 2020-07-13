import * as types from "../actions/color/color.constant";

const initialState: Array<string> = [];

const colorArrayReducers = (state = initialState, action: any) => {
  switch (action.type) {
    case types.GET_ARRAY_COLOR:
      state = action.arrayColor;
      return state;
    default:
      return state;
  }
};
export default colorArrayReducers;
