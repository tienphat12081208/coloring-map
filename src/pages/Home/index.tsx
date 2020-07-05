import React, { useState } from "react";
import MapChart from "../../components/Map";
import { Row, Col } from "antd";
import Dashboard from "../../components/Dashboard";
// Import Redux
import { connect } from "react-redux";

import "./style.scss";
import Node from "../../components/Node";
import ImageGroup from "../../components/ImageGroups";

interface IProps {
  displayReducers?: any;
}
const Home = (props: IProps) => {
  const { displayReducers } = props;
  const [numberColor, setNumberColor] = useState(0);

  const getValueMinimumColor = (minimumColor: number) => {
    setNumberColor(minimumColor);
  };

  const resetNumberColor = () => {
    setNumberColor(0);
  };

  return (
    <>
      <Row className="page-home">
        <Col className="page-home-map" span={18}>
          {displayReducers === 2 && <ImageGroup />}
          {displayReducers === 0 && (
            <MapChart ValueMinimumColor={getValueMinimumColor} />
          )}
          {displayReducers === 1 && (
            <Node ValueMinimumColor={getValueMinimumColor} />
          )}
        </Col>
        <Col span={6} className="page-home-dashboard">
          <Dashboard
            numberColor={numberColor}
            resetNumberColor={resetNumberColor}
          />
        </Col>
      </Row>
    </>
  );
};

export default connect(
  (state: any) => ({
    displayReducers: state.displayReducers,
  }),
  null
)(Home);
