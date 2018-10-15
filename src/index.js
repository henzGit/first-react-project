import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import data from "./data.json"
import App from "./App";

const countries = data.countries;

ReactDOM.render(
    <App countries={countries} />,
    document.getElementById('root')
);
