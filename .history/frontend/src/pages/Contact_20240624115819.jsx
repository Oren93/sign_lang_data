import React from "react";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h2>{t('contact_us')}</h2>
      <p>{t('info_message')}</p>
      <p>{t('email_info')}</p>
      <p>{t('phone_info')}</p>
    </div>
  );
};

export default Contact;
