import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import * as serviceWorker from "./serviceWorker";
import Routes from "./configs/router";
import rootReducer from "./store/reducers/index";
import "antd/dist/antd.css";
import "./index.css";
const initialState = {};
const middlwwares = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlwwares))
);

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
