import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";

import {Provider} from "react-redux"
import { createStore, applyMiddleware} from 
"redux"
import promiseMiddelware from "redux"
import ReduxThunk from "redux-thunk"

import Reducer from "./reducers"

import "materialize-css/dist/css/materialize.min.css"

const createStoreMiddleware = applyMiddleware(promiseMiddelware, ReduxThunk)(createStore)

ReactDOM.render(
  // <Provider store=(createStoreMiddleware(Reducer, ))/>
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
