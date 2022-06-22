import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/views/App/App";
import { BrowserRouter } from "react-router-dom";

// TODO: Change the string instide of getElementById to the id set in index.html
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("change")
);
