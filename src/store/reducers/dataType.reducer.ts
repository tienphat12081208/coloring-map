import * as types from "../actions/dataType/datatype.constant";

const initialState: string = "SOUTHEAST_ASIA";

const dataTypeReducers = (state = initialState, action: any) => {
  switch (action.type) {
    case types.GET_VALUE_SELECT_DATA:
      state = action.dataType;
      return state;
    default:
      return state;
  }
};
export default dataTypeReducers;
