import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App.jsx";
import reportWebVitals from "./reportWebVitals.jsx";
import { UserProvider } from "./context/UserContext";

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
