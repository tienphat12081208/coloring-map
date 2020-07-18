import * as types from "./loading.constants";

export const loadingStart = () => {
  return {
    type: types.LOADING_START,
  };
};

export const loadingEnd = () => {
  return {
    type: types.LOADING_END,
  };
};

export const loadingActions = {
  loadingStart,
  loadingEnd,
};
