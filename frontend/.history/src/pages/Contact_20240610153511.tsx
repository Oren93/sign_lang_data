// src/pages/Contact.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const Contact: React.FC = () => {
  return (
    <main>
      <section>
        <h2>{t('contact_us')}</h2>
        <p>{t('info_message')}</p>
        <p>{t('email_info')}</p>
        <p>{t('phone_info')}</p>
      </section>
    </main>
  );
};

export default Contact;
