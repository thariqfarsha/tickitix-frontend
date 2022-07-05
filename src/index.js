import React from "react";
import ReactDOM from "react-dom/client";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./scss/customBootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Store from "./stores";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={Store.store}>
    <PersistGate loading={null} persistor={Store.persistor}>
      <App />
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
