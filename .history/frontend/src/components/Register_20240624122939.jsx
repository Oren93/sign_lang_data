import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { UserContext } from "../context/UserContext";
import ErrorMessage from "./ErrorMessage";

const Register = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { setToken } = useContext(UserContext);

  const submitRegistration = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        username: username,
        password_salted: password, // TODO: Add salt to password
      }),
    };

    const response = await fetch(
      "http://localhost:8001/user/create",
      requestOptions
    );
    const data = await response.json();

    if (!response.ok) {
      setErrorMessage(data.detail);
    } else {
      setToken(data.access_token);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmationPassword && password.length > 5) {
      submitRegistration();
    } else {
      setErrorMessage(
        t("register.errorMessage")
      );
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>{t("register.title")}</h1>
        <div>
          <label>{t("register.emailLabel")}</label>
          <div>
            <input
              type="email"
              placeholder={t("register.emailPlaceholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <div>
          <label>{t("register.usernameLabel")}</label>
          <div>
            <input
              type="username"
              placeholder={t("register.usernamePlaceholder")}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        </div>
        <div>
          <label>{t("register.passwordLabel")}</label>
          <div>
            <input
              type="password"
              placeholder={t("register.passwordPlaceholder")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div>
          <label>{t("register.confirmPasswordLabel")}</label>
          <div>
            <input
              type="password"
              placeholder={t("register.confirmPasswordPlaceholder")}
              value={confirmationPassword}
              onChange={(e) => setConfirmationPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <ErrorMessage message={errorMessage} />
        <br />
        <button type="submit">{t("register.submitButton")}</button>
      </form>
    </div>
  );
};

export default Register;
