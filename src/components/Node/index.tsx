import React, { useEffect, useState } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import { changeDataNode } from "../../services/ChangeDataNode/index";
import { connect } from "react-redux";

import * as mockData from "../../mocks/index";
import { DataType } from "../../types/DataType";

import { coloring } from "../../services/Coloring";
import { bindActionCreators, Dispatch } from "redux";
import { arrayColorActions } from "../../store/actions/color/color.action";
import { loadingActions } from "../../store/actions/loading/loading.action";

const INITIAL_STATE: any = [];

interface IProps {
  dataTypeReducers?: any;
  ValueMinimumColor?: any;
  actionsArrayColor?: any;
  actionsLoading?: any;
}
const Node = (props: IProps) => {
  const [elementsNode, setElementsNode] = useState(INITIAL_STATE);
  const [arrayColoring, setArrayColoring] = useState(INITIAL_STATE);
  const [flag, setFlag] = useState(0); // Flag useEffect
  const [flag2, setFlag2] = useState(0); // Flag useEffect

  let stylesheet: any = [
    {
      selector: "node",
      style: {
        "background-color": "#282",
        width: "40px",
        height: "40px",
        label: "data(label)",
      },
    },
    {
      selector: "edge",
      style: {},
    },
  ];

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

  dataMockName(props.dataTypeReducers).map((item, index) => {
    return stylesheet.push({
      selector: `node[type=${index}]`,
      style: {
        "background-color": `${returnColor(index)}`,
      },
    });
  });

  const getColor = (data: any) => {
    let Array = [];
    for (let i = 0; i < data.length; i++) {
      Array.push(returnColor(i));
    }
    props.actionsArrayColor.getArrayColor(Array);
  };

  useEffect(() => {
    const response: any = changeDataNode(
      dataMockMatrix(props.dataTypeReducers),
      dataMockName(props.dataTypeReducers),
      props.dataTypeReducers,
      window.innerWidth,
      window.innerHeight
    );

    setElementsNode(response.responseData);
    const responseColoring: any = coloring(
      dataMockMatrix(props.dataTypeReducers)
    );

    setArrayColoring(responseColoring.arrayColor);
    props.ValueMinimumColor(responseColoring.colorNumber);
    props.ValueMinimumColor(responseColoring.colorNumber);

    props.actionsLoading.loadingStart();
    setTimeout(() => {
      props.actionsLoading.loadingEnd();
    }, 1000);
    setFlag((flag) => flag + 1);
  }, [props.dataTypeReducers, props]);

  if (flag2 < flag) {
    setFlag2(flag2 + 1);
    getColor(arrayColoring);
  }

  return (
    <>
      <CytoscapeComponent
        elements={elementsNode}
        stylesheet={stylesheet}
        style={
          window.innerHeight <= 1024 && window.innerWidth <= 1024
            ? { height: "85vh", width: "100%" }
            : { height: "100vh", width: "100%" }
        }
        className="component-node"
        minZoom={1}
        maxZoom={1}
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
)(Node);
