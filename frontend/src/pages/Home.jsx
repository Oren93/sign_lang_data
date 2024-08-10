import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { UserContext } from '../context/UserContext';
import { Video, Upload, Download, Search, Info, Mail, LogIn, UserPlus, ArrowRight } from 'lucide-react';

const Home = () => {
  const { t } = useTranslation('homepage');
  const { user } = useContext(UserContext);

  const navItems = [
    { name: t('header.home_button'), icon: <Video size={18} />, path: '/' },
    { name: t('header.about_button'), icon: <Info size={18} />, path: '/about' },
    { name: t('header.contact_button'), icon: <Mail size={18} />, path: '/contact' },
  ];

  const features = [
    { title: t('contribute_data'), icon: <Upload size={24} />, color: 'bg-emerald-100 text-emerald-700', path: '/record' },
    { title: t('access_data'), icon: <Download size={24} />, color: 'bg-blue-100 text-blue-700', path: '/data-access' },
    { title: t('learn_more'), icon: <Info size={24} />, color: 'bg-amber-100 text-amber-700', path: '/about' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">{t('welcome_message')}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('portal_description')}
          </p>
        </section>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className={`${feature.color} rounded-lg p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
            >
              <div className="flex items-center justify-between mb-4">
                {feature.icon}
                <ArrowRight size={20} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm">
                {t('feature_description', { feature: feature.title.toLowerCase() })}
              </p>
              <Link to={feature.path} className="mt-4 text-sm font-medium flex items-center">
                {t('learn_more')} <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          ))}
        </div>

        <section className="mt-16 bg-indigo-700 text-white rounded-lg p-8 shadow-lg">
          <div className="md:flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">{t('ready_to_start')}</h3>
              <p className="mb-4 md:mb-0">{t('join_community')}</p>
            </div>
            {!user ? (
              <Link to="/signup" className="bg-white text-indigo-700 px-6 py-2 rounded-full font-semibold hover:bg-indigo-100 transition-colors duration-300">
                {t('sign_up_now')}
              </Link>
            ) : (
              <Link to="/record" className="bg-white text-indigo-700 px-6 py-2 rounded-full font-semibold hover:bg-indigo-100 transition-colors duration-300">
                {t('start_contributing')}
              </Link>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;