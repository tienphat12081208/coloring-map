import * as types from "../actions/loading/loading.constants";

const initialState: boolean = false;

const loadingReducers = (state = initialState, action: any) => {
  switch (action.type) {
    case types.LOADING_START:
      state = true;
      return state;
    case types.LOADING_END:
      state = false;
      return state;
    default:
      return state;
  }
};
export default loadingReducers;
