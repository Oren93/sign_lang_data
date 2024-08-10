import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { UserContext } from "../context/UserContext";
import { Mail, Lock, User, UserPlus } from 'lucide-react';

const Register = () => {
  const { t } = useTranslation('login_sign_up');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { setToken } = useContext(UserContext);
  const navigate = useNavigate();

  const submitRegistration = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        username: username,
        password_salted: password,
      }),
    };

    try {
      const response = await fetch(
        "http://localhost:8001/user/create",
        requestOptions
      );
      const data = await response.json();

      if (response.ok) {
        setToken(data.access_token);
        navigate("/");
      } else {
        setErrorMessage(data.detail || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmationPassword && password.length > 5) {
      submitRegistration();
    } else {
      setErrorMessage(t("register.errorMessage"));
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">{t("register.title")}</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="email">{t("register.emailLabel")}</label>
            <div className="relative">
              <input
                type="email"
                id="email"
                className="w-full p-2 pl-10 border rounded focus:ring-2 focus:ring-primary-500"
                placeholder={t("register.emailPlaceholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="username">{t("register.usernameLabel")}</label>
            <div className="relative">
              <input
                type="text"
                id="username"
                className="w-full p-2 pl-10 border rounded focus:ring-2 focus:ring-primary-500"
                placeholder={t("register.usernamePlaceholder")}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="password">{t("register.passwordLabel")}</label>
            <div className="relative">
              <input
                type="password"
                id="password"
                className="w-full p-2 pl-10 border rounded focus:ring-2 focus:ring-primary-500"
                placeholder={t("register.passwordPlaceholder")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="confirmPassword">{t("register.confirmPasswordLabel")}</label>
            <div className="relative">
              <input
                type="password"
                id="confirmPassword"
                className="w-full p-2 pl-10 border rounded focus:ring-2 focus:ring-primary-500"
                placeholder={t("register.confirmPasswordPlaceholder")}
                value={confirmationPassword}
                onChange={(e) => setConfirmationPassword(e.target.value)}
                required
              />
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <button 
            type="submit" 
            className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition-colors duration-300 flex items-center justify-center"
          >
            <UserPlus size={18} className="mr-2" />
            {t("register.submitButton")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;