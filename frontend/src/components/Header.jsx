import React, { useContext, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { UserContext } from "../context/UserContext";
import LanguageSwitcher from "./LanguageSwitch";
import { Video, Info, Mail, LogIn, UserPlus, LogOut } from "lucide-react";

const Header = ({ handleLogout }) => {
  const { t } = useTranslation("common");
  const { user } = useContext(UserContext);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navItems = [
    { name: t("header.home_button"), icon: <Video size={18} />, path: "/" },
    {
      name: t("header.about_button"),
      icon: <Info size={18} />,
      path: "/about",
    },
    {
      name: t("header.contact_button"),
      icon: <Mail size={18} />,
      path: "/contact",
    },
  ];

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-bold text-gray-800 flex items-center"
          >
            <Video className="mr-2 text-indigo-600" />{" "}
            {t("header.website_name")}
          </Link>

          <nav>
            <ul className="flex space-x-6 items-center">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors duration-300"
                  >
                    {item.icon}
                    <span className="ml-1">{item.name}</span>
                  </Link>
                </li>
              ))}

              {user ? (
                <>
                  <li>
                    <Link
                      to="/record"
                      className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors duration-300"
                    >
                      <Video size={18} className="mr-1" />
                      {t("header.record_button")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/rate"
                      className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors duration-300"
                    >
                      <Video size={18} className="mr-1" />
                      {t("header.rate_button")}
                    </Link>
                  </li>
                  <li className="relative" ref={dropdownRef}>
                    <button
                      onClick={toggleDropdown}
                      className="text-gray-600 font-semibold focus:outline-none"
                    >
                      {user.username}
                    </button>

                    {isDropdownOpen && (
                      <ul className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                        <li className="px-4 py-2 hover:bg-gray-100">
                          <button
                            onClick={handleLogout}
                            className="flex items-center text-gray-700 w-full"
                          >
                            <LogOut size={18} className="mr-2" />
                            {t("header.logout_button")}
                          </button>
                        </li>
                      </ul>
                    )}
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to="/signup"
                      className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors duration-300"
                    >
                      <UserPlus size={18} className="mr-1" />
                      {t("header.sign_up_button")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/login"
                      className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors duration-300"
                    >
                      <LogIn size={18} className="mr-1" />
                      {t("header.login_button")}
                    </Link>
                  </li>
                </>
              )}

              <li>
                <LanguageSwitcher />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
