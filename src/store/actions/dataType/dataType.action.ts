import * as types from "./datatype.constant";

export const getDataType = (dataType: string) => {
  return {
    type: types.GET_VALUE_SELECT_DATA,
    dataType,
  };
};

export const dataTypeActions = {
  getDataType,
};
