import * as types from "./display.constant";

export const getValueDisplay = (valueDisplay: number) => {
  return {
    type: types.GET_VALUE_DISPLAY,
    valueDisplay,
  };
};

export const displayActions = {
  getValueDisplay,
};
