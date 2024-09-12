import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import API_BASE_URL from "/app/src/config";

const Login = ({ handleLogin }) => {
  const { t } = useTranslation("login_sign_up");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`${API_BASE_URL}/auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      handleLogin(data.token);
    } else {
      console.error(t("login.loginFailed"));
    }
  };

  return (
    <div>
      <h1>{t("login.title")}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          {t("login.usernameLabel")}
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          {t("login.passwordLabel")}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">{t("login.submitButton")}</button>
      </form>
    </div>
  );
};

export default Login;
