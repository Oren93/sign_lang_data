import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ErrorMessage from "./ErrorMessage";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { setToken, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const submitLogin = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: JSON.stringify(
        `grant_type=&username=${email}&password=${password}&scope=&client_id=&client_secret=`
      ),
    };

    const response = await fetch(
      "http://localhost:8001/user/login",
      requestOptions
    );
    const data = await response.json();

    if (response.ok) {
      setToken(data.access_token);
      setUser(data.user);
      navigate("/");
    } else {
      setErrorMessage(data.detail);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitLogin();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>{t("login.title")}</h1>
        <div>
          <label>{t("login.emailLabel")}</label>
          <div>
            <input
              type="email"
              placeholder={t("login.emailPlaceholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <div>
          <label>{t("login.passwordLabel")}</label>
          <div>
            <input
              type="password"
              placeholder={t("login.passwordPlaceholder")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <ErrorMessage message={errorMessage} />
        <br />
        <button type="submit">{t("login.submitButton")}</button>
      </form>
    </div>
  );
};

export default Login;
