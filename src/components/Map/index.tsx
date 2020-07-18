import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import * as mockData from "../../mocks/index";
import { coloring } from "../../services/Coloring/index";
// Import Redux
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import { arrayColorActions } from "../../store/actions/color/color.action";
import { loadingActions } from "../../store/actions/loading/loading.action";

import { DataType } from "../../types/DataType";

import "./style.scss";
const INITIAL_STATE: any = [];
interface IProps {
  dataTypeReducers?: any;
  ValueMinimumColor?: any;
  actionsArrayColor?: any;
  actionsLoading?: any;
}
const MapChart = (props: IProps) => {
  const [arrayColoring, setArrayColoring] = useState(INITIAL_STATE);
  const [arrayData, setArrayData] = useState(INITIAL_STATE); // Data import geo chart

  const [arrayValue, setArrayValue] = useState(INITIAL_STATE); //  value geo chart
  const [color, setColor] = useState(INITIAL_STATE); //  color geo chart
  const [flag, setFlag] = useState(0); // Flag useEffect
  const [flag2, setFlag2] = useState(0); // Flag useEffect

  // Get data geo chart
  const getArrayDataName = (data: any) => {
    let Array: any = [["State", "Values"]];
    let arrayValueFlag: any = [];
    for (let i = 0; i < data.length; i++) {
      Array.push([data[i], i]);
      arrayValueFlag.push(i);
    }
    setArrayData(Array);
    setArrayValue(arrayValueFlag);
  };

  const returnColor = (index: number) => {
    switch (arrayColoring[index]) {
      case 1:
        return "red";

      case 2:
        return "blue";

      case 3:
        return "yellow";

      case 4:
        return "green";

      case 5:
        return "black";

      case 6:
        return "Purple";

      default:
        return "white";
    }
  };

  //Mock data name
  const dataMockName = (dataType: string) => {
    switch (dataType) {
      case DataType.SOUTHEAST_ASIA:
        return mockData.SOUTHEAST_ASIA_NAME;

      case DataType.VIET_NAM:
        return mockData.VIETNAM_NAME;
      default:
        return mockData.SOUTHEAST_ASIA_NAME;
    }
  };

  //Mock data matrix
  const dataMockMatrix = (dataType: string) => {
    switch (dataType) {
      case DataType.SOUTHEAST_ASIA:
        return mockData.SOUTHEAST_ASIA;

      case DataType.VIET_NAM:
        return mockData.VIETNAM;

      default:
        return mockData.SOUTHEAST_ASIA;
    }
  };

  const getColor = (data: any) => {
    let Array = [];
    for (let i = 0; i < data.length; i++) {
      Array.push(returnColor(i));
    }
    setColor(Array);
    props.actionsArrayColor.getArrayColor(Array);
  };

  useEffect(() => {
    getArrayDataName(dataMockName(props.dataTypeReducers));
    const responseColoring: any = coloring(
      dataMockMatrix(props.dataTypeReducers)
    );
    setArrayColoring(responseColoring.arrayColor);
    setFlag((flag) => flag + 1);
    props.ValueMinimumColor(responseColoring.colorNumber);
    props.actionsLoading.loadingStart();
    setTimeout(() => {
      props.actionsLoading.loadingEnd();
    }, 1000);
  }, [arrayColoring.length, props.dataTypeReducers, props]);

  // flag check follow useEffect
  if (flag2 < flag) {
    setFlag2(flag2 + 1);
    getColor(arrayColoring);
  }

  return (
    <>
      <Chart
        mapsApiKey="AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY"
        chartType={"GeoChart"}
        data={arrayData}
        className="component-chart"
        options={{
          colorAxis: {
            colors: color,
            values: arrayValue,
          },
          legend: "none",
          region: `${
            props.dataTypeReducers === DataType.SOUTHEAST_ASIA ? "035" : "VN"
          }`,
          displayMode: "regions",
          resolution: `${
            props.dataTypeReducers === DataType.SOUTHEAST_ASIA
              ? ""
              : "provinces"
          }`,
        }}
      />
    </>
  );
};
export default connect(
  (state: any) => ({
    dataTypeReducers: state.dataTypeReducers,
  }),
  (dispatch: Dispatch) => ({
    actionsArrayColor: bindActionCreators(arrayColorActions, dispatch),
    actionsLoading: bindActionCreators(loadingActions, dispatch),
  })
)(MapChart);
