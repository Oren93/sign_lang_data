import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App.jsx";
import reportWebVitals from "./reportWebVitals.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import { I18nextProvider } from "react-i18next";
import i18n from "./components/i18n";

ReactDOM.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <UserProvider>
        <App />
      </UserProvider>
    </I18nextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
