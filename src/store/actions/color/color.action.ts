import * as types from "./color.constant";

export const getArrayColor = (arrayColor: any) => {
  return {
    type: types.GET_ARRAY_COLOR,
    arrayColor,
  };
};

export const arrayColorActions = {
  getArrayColor,
};
