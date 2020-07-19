import React from "react";
import { connect } from "react-redux";

import loading_icon from "../../assets/images/loading-coloring.gif";

import "./style.scss";

interface Props {
  loadingReducers?: boolean;
}

const Loading = (props: Props) => {
  const { loadingReducers } = props;
  
  return (
    <>
      {loadingReducers ? (
        <div className="layout_loading">
          <img
            src={loading_icon}
            alt="loading"
            className="layout_loading_detail"
          />
        </div>
      ) : null}
    </>
  );
};

export default connect(
  (state: any) => ({
    loadingReducers: state.loadingReducers,
  }),
  null
)(Loading);
