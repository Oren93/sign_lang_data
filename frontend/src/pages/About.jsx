import React from "react";
import { useTranslation } from "react-i18next";
import { Users, Target, Star } from "lucide-react";

const About = () => {
  const { t } = useTranslation("about");

  const sections = [
    {
      title: t("mission_title"),
      content: t("mission_content"),
      icon: <Target size={24} />,
    },
    {
      title: t("team_title"),
      content: t("team_content"),
      icon: <Users size={24} />,
    },
    {
      title: t("goals_title"),
      content: t("goals_content"),
      icon: <Star size={24} />,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
        {t("about_us")}
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {sections.map((section, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-lg">
            <div className="flex items-center mb-4">
              {section.icon}
              <h3 className="text-xl font-semibold ml-2">{section.title}</h3>
            </div>
            <p className="text-gray-600">{section.content}</p>
          </div>
        ))}
      </div>
      <div className="mt-12 bg-indigo-100 rounded-lg p-8">
        <h3 className="text-2xl font-bold mb-4 text-indigo-800">
          {t("goal_description_title")}
        </h3>
        <p className="text-indigo-700">{t("goal_description")}</p>
      </div>
    </div>
  );
};

export default About;
