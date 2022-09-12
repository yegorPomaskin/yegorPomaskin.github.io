import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { applyMiddleware, legacy_createStore as createStore } from "redux";
import rootReducer from "./store/reducers/rootReducer";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import thunk from "redux-thunk";
import Register from "./screen/Register/Register";

const store = createStore(rootReducer, applyMiddleware(thunk));

const app = (
  <Provider store={store}>
    <BrowserRouter>
        <Route exact path="/" component={App}/>
        <Route path="/register" component={Register}/>
      {/* <App /> */}
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
