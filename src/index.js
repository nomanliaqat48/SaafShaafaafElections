import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Web3Provider } from "./context/web3Context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Web3Provider>
      <ToastContainer />
      <App />
    </Web3Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
