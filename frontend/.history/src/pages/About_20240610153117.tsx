// src/pages/About.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const About: React.FC = () => {
  const{ t } = useTranslation();
  return (
    <main>
      <section>
        <h2>{t('about_us')}</h2>
        <p>{t('goal_description')}</p>
      </section>
    </main>
  );
};

export default About;
