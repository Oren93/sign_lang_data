import React from "react";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h2>{t('about_us')}</h2>
      <p>{t('goal_description')}</p>
    </div>
  );
};

export default About;
