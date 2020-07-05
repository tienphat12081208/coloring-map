import React, { useEffect, useState } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import { changeDataNode } from "../../services/ChangeDataNode/index";
import { connect } from "react-redux";
import * as mockData from "../../mocks/index";
import { coloring } from "../../services/Coloring";
import { bindActionCreators, Dispatch } from "redux";
import { arrayColorActions } from "../../store/actions/color/color.action";

const INITIAL_STATE: any = [];

interface IProps {
  dataTypeReducers?: any;
  ValueMinimumColor?: any;
}
const Node = (props: IProps) => {
  const [elementsNode, setElementsNode] = useState(INITIAL_STATE);
  const [arrayColoring, setArrayColoring] = useState(INITIAL_STATE);

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
      case "SOUTHEAST_ASIA":
        return mockData.SOUTHEAST_ASIA_NAME;

      case "VIET_NAM":
        return mockData.VIETNAM_NAME;
      default:
        return mockData.SOUTHEAST_ASIA_NAME;
    }
  };

  //Mock data matrix
  const dataMockMatrix = (dataType: string) => {
    switch (dataType) {
      case "SOUTHEAST_ASIA":
        return mockData.SOUTHEAST_ASIA;

      case "VIET_NAM":
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

  useEffect(() => {
    const response: any = changeDataNode(
      dataMockMatrix(props.dataTypeReducers),
      dataMockName(props.dataTypeReducers)
    );
    setElementsNode(response.responseData);
    const responseColoring: any = coloring(
      dataMockMatrix(props.dataTypeReducers)
    );
    setArrayColoring(responseColoring.arrayColor);
    props.ValueMinimumColor(responseColoring.colorNumber);
  }, [props.dataTypeReducers, props]);

  return (
    <>
      <CytoscapeComponent
        elements={elementsNode}
        style={{ width: "100%", height: "100vh" }}
        stylesheet={stylesheet}
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
  })
)(Node);
