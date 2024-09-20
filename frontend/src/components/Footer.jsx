import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Video, Info, Mail, LogIn, UserPlus } from "lucide-react";
import Rannis from "../svg/Rannis.svg";
import HI from "../svg/HI.svg";

const Footer = () => {
  const { t } = useTranslation("common");

  const quickLinks = [
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
    {
      name: t("header.sign_up_button"),
      icon: <UserPlus size={18} />,
      path: "/signup",
    },
    {
      name: t("header.login_button"),
      icon: <LogIn size={18} />,
      path: "/login",
    },
  ];

  return (
    <footer className="bg-gray-600 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-4">
              {t("footer.quick_links")}
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="hover:text-indigo-400 transition-colors duration-300 flex items-center"
                  >
                    {item.icon}
                    <span className="ml-2">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">
              {t("footer.contact_us")}
            </h4>
            <p>{t("footer.email_info")}</p>
            <p>{t("footer.phone_info")}</p>
          </div>
          {/*
          <div>
            <h4 className="text-lg font-semibold mb-4">
              {t("footer.newsletter")}
            </h4>
            <p className="mb-2">{t("footer.newsletter_description")}</p>
            <div className="flex">
              <input
                type="email"
                placeholder={t("footer.email_placeholder")}
                className="bg-gray-700 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button className="bg-indigo-600 px-4 py-2 rounded-r-md hover:bg-indigo-700 transition-colors duration-300">
                {t("footer.subscribe")}
              </button>
            </div>
          </div>
          */}
        </div>
        <div className="mt-8 text-center text-gray-400 flex flex-col items-center">
          <p>&#169;{t("footer.website_owner")}</p>
          <div className="flex space-x-8 mt-2">
            <img src={HI} alt="HI logo" className="h-10" />
            <img src={Rannis} alt="Rannis logo" className="h-10" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
