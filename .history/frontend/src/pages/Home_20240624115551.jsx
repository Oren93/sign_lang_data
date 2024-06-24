import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();

  return (
    <div>
      <section>
        <h2>{t('welcome_message')}</h2>
        <p>{t('portal_description')}</p>
        <p>{t('navigation_prompt')}</p>
      </section>
      <section>
        <h3>{t('contribute_data')}</h3>
        <p>{t('contribute_instruction')}</p>
        <ol>
          <li>{t('guideline_compliance')}</li>
          <li>{t('upload_files')}</li>
        </ol>
        <Link to="/record">{t('go_to_upload')}</Link>
      </section>
      <section>
        <h3>{t('access_data')}</h3>
        <p>{t('access_instruction')}</p>
        <Link to="/browse">{t('browse_data')}</Link>
      </section>
    </div>
  );
};

export default Home;
