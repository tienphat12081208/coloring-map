import * as mockData from "../../mocks";
import { DataType } from "../../types/DataType";

const mockDataPosition = (dataType: string) => {
  switch (dataType) {
    case DataType.SOUTHEAST_ASIA:
      return mockData.SOUTHEAST_ASIA_POSITION;
    case DataType.VIET_NAM:
      return mockData.VIET_NAM_POSITION;
    default:
      return mockData.SOUTHEAST_ASIA_POSITION;
  }
};

export const changeDataNode = (
  dataNode: any,
  dataName: any,
  dataType: string,
  widthScreen: number,
  heightScreen: number
) => {
  const responseData: any = [];
  for (let i = 0; i < dataNode.length; i++) {
    const xPosition =
      widthScreen <= 1024
        ? (widthScreen * mockDataPosition(dataType)[i].x) / 1520 + 50
        : mockDataPosition(dataType)[i].x;

    const yPosition =
      heightScreen <= 1024 && widthScreen <= 1024
        ? (heightScreen * mockDataPosition(dataType)[i].y) / 900
        : mockDataPosition(dataType)[i].y;

    responseData.push({
      data: { id: i, label: dataName[i], type: i },
      position: {
        x: xPosition,
        y: yPosition,
      },
    });
  }
  for (let i = 0; i < dataNode.length; i++) {
    for (let j = 0; j < dataNode.length; j++) {
      if (dataNode[i][j] === 1) {
        responseData.push({
          data: { source: i, target: j },
        });
      }
    }
  }
  return {
    responseData: responseData,
  };
};
