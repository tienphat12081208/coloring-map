import React, { useState, useEffect } from "react";
import { Row, Col, Select } from "antd";
import * as mockData from "../../mocks/index";
// Import Redux
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { displayActions } from "../../store/actions/display/display.action";
import { dataTypeActions } from "../../store/actions/dataType/dataType.action";
import { DataType } from "../../types/DataType";

import { ArrowLeftOutlined } from "@ant-design/icons";
import "./style.scss";

interface IProps {
  actionsDisplay?: any;
  actionsTypeData?: any;
  numberColor: number;
  dataTypeReducers?: any;
  colorArrayReducers?: any;
  resetNumberColor?: any;
}
const INITIAL_STATE: any = [];
const { Option } = Select;
const Dashboard = (props: IProps) => {
  const [display, setDisplay] = useState(2);
  const [dataName, setDataName] = useState(INITIAL_STATE);
  const [color, setColor] = useState(INITIAL_STATE);

  const handelClickDisplayMap = (event: any) => {
    event.preventDefault();
    setDisplay(0);
    props.actionsDisplay.getValueDisplay(0);
  };

  const handelClickDisplayNode = (event: any) => {
    event.preventDefault();
    setDisplay(1);
    props.actionsDisplay.getValueDisplay(1);
  };

  const handleBackHome = () => {
    setDisplay(2);
    props.actionsDisplay.getValueDisplay(2);
    props.resetNumberColor();
  };

  const handleChangeDataType = (value: string) => {
    props.actionsTypeData.getDataType(value);
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
  //Get value props
  const arrColorUse = props.colorArrayReducers;
  const arrColorUseFlag = props.colorArrayReducers;

  useEffect(() => {
    setDataName(dataMockName(props.dataTypeReducers));
    let statistical: any = [];
    var arraySkipRepeat: any = [...Array.from(new Set(arrColorUseFlag))];
    for (let i = 0; i < arraySkipRepeat.length; i++) {
      let count = 0;
      for (let j = 0; j < arrColorUseFlag.length; j++) {
        if (arrColorUseFlag[j] === arraySkipRepeat[i]) {
          count++;
        }
      }
      statistical.push({ color: `${arraySkipRepeat[i]}`, number: count });
    }
    setColor(statistical);
  }, [props.dataTypeReducers, arrColorUse, arrColorUseFlag, props.numberColor]);

  return (
    <>
      <Row className="component-dashboard">
        <Col span={20} offset={2}>
          <Row className="component-dashboard-type">
            <Col span={12} className="component-dashboard-type-map ">
              <button
                onClick={handelClickDisplayMap}
                className={`${
                  display === 0 ? "component-dashboard-type-active" : " "
                }`}
              >
                MAP
              </button>
            </Col>
            <Col span={12} className="component-dashboard-type-node">
              <button
                onClick={handelClickDisplayNode}
                className={`${
                  display === 1 ? "component-dashboard-type-active" : " "
                }`}
              >
                NODE
              </button>
            </Col>
          </Row>
        </Col>
        <Col span={20} offset={2} className="component-dashboard-type-data">
          <Select
            defaultValue={DataType.SOUTHEAST_ASIA}
            style={{ width: "100%", height: "42px" }}
            onChange={handleChangeDataType}
          >
            <Option value={DataType.SOUTHEAST_ASIA}>SOUTHEAST ASIA</Option>
            <Option value={DataType.VIET_NAM}>VIET NAM</Option>
          </Select>
        </Col>
        <Col span={20} offset={2}>
          {props.numberColor ? (
            <>
              <div className="component-dashboard-statistical">
                <Row>
                  <Col
                    span={24}
                    className="component-dashboard-statistical-minimum"
                  >
                    <p>{props.numberColor}</p>
                  </Col>
                  {color.map((item: any, index: number) => (
                    <div
                      className="component-dashboard-statistical-detail"
                      key={index}
                    >
                      <Col
                        span={24}
                        style={{ fontSize: "30px", color: "black" }}
                      >
                        {item.number}
                      </Col>
                      <Col span={24} style={{ color: `${item.color}` }}>
                        {item.color}
                      </Col>
                    </div>
                  ))}
                </Row>
              </div>
              <div className="component-dashboard-data">
                <table
                  style={{ width: "100%" }}
                  className="component-dashboard-table"
                >
                  <thead>
                    <tr className="component-dashboard-table-title">
                      <th>STT</th>
                      <th>Name</th>
                      <th>Color</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataName.map((item: any, index: number) => (
                      <tr
                        key={index}
                        className="component-dashboard-table-item"
                      >
                        <td>{index + 1}</td>
                        <td>{item}</td>
                        <td>
                          <div
                            style={{
                              backgroundColor: arrColorUse[index],
                              width: "100%",
                              height: "24px",
                              padding: "10px",
                            }}
                          ></div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            //  Name team work project
            <div className="component-dashboard-member">
              <div className="component-dashboard-problem">
                <div className="component-dashboard-problem-title">
                  <p>Request math problem</p>
                </div>
                <div className="component-dashboard-problem-detail">
                  Coloring a map is the implementation of assigning a color to
                  the province or country of the map, so that two adjacent
                  provinces or countries do not have the same color and that the
                  number of colors used is at least.
                </div>
              </div>
              <table
                style={{ width: "100%" }}
                className="component-dashboard-table-member"
              >
                <thead>
                  <tr className="component-dashboard-table-member-title">
                    <th colSpan={3}>Member group 2</th>
                  </tr>
                </thead>
                <tbody>
                  {mockData.MEMBER_GROUP_2.map((member: any, index: number) => (
                    <tr className="component-dashboard-table-item" key={index}>
                      <td>{index + 1}</td>
                      <td>{member.name}</td>
                      <td>{member.number}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Col>

        {/*Thong ke <Col></Col>  */}
        {display !== 2 && (
          <div
            onClick={handleBackHome}
            className="component-dashboard-back-home"
          >
            <ArrowLeftOutlined style={{ fontSize: "16px", width: "24px" }} />
            <span>Back home</span>
          </div>
        )}
      </Row>
    </>
  );
};

export default connect(
  (state: any) => ({
    dataTypeReducers: state.dataTypeReducers,
    colorArrayReducers: state.colorArrayReducers,
  }),
  (dispatch: Dispatch) => ({
    actionsDisplay: bindActionCreators(displayActions, dispatch),
    actionsTypeData: bindActionCreators(dataTypeActions, dispatch),
  })
)(Dashboard);
