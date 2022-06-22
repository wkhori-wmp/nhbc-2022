import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/views/App/App";
import { BrowserRouter } from "react-router-dom";

// TODO: change "root" and save the file. Observe what happens in the app
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
