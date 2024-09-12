import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { UserContext } from "../context/UserContext";
import { Mail, Lock, LogIn } from "lucide-react";
import API_BASE_URL from "/app/src/config";

const Login = () => {
  const { t } = useTranslation("login_sign_up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { setToken, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const submitLogin = async () => {
    const formData = new URLSearchParams();
    formData.append("grant_type", "password");
    formData.append("username", email);
    formData.append("password", password);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData,
    };

    try {
      const response = await fetch(
        `${API_BASE_URL}/user/login`,
        requestOptions
      );
      const data = await response.json();

      if (response.ok) {
        setToken(data.access_token);
        setUser(data.user);
        navigate("/");
      } else {
        setErrorMessage(data.detail || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitLogin();
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {t("login.title")}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="email">
              {t("login.emailLabel")}
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                className="w-full p-2 pl-10 border rounded focus:ring-2 focus:ring-primary-500"
                placeholder={t("login.emailPlaceholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Mail
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="password">
              {t("login.passwordLabel")}
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                className="w-full p-2 pl-10 border rounded focus:ring-2 focus:ring-primary-500"
                placeholder={t("login.passwordPlaceholder")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Lock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
            </div>
          </div>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center"
          >
            <LogIn size={18} className="mr-2" />
            {t("login.submitButton")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
