import React from "react";
import { useTranslation } from "react-i18next";
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  const { t } = useTranslation('contact');

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">{t('contact_us')}</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <p className="mb-6 text-gray-600">{t('info_message')}</p>
          <div className="space-y-4">
            <div className="flex items-center">
              <Mail className="text-indigo-600 mr-2" />
              <span>{t('email_info')}</span>
            </div>
            <div className="flex items-center">
              <Phone className="text-indigo-600 mr-2" />
              <span>{t('phone_info')}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="text-indigo-600 mr-2" />
              <span>{t('address_info')}</span>
            </div>
          </div>
        </div>
        <div>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-1 font-medium">{t('form_name')}</label>
              <input type="text" id="name" className="w-full p-2 border rounded" />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1 font-medium">{t('form_email')}</label>
              <input type="email" id="email" className="w-full p-2 border rounded" />
            </div>
            <div>
              <label htmlFor="message" className="block mb-1 font-medium">{t('form_message')}</label>
              <textarea id="message" rows="4" className="w-full p-2 border rounded"></textarea>
            </div>
            <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors duration-300 flex items-center">
              <Send size={18} className="mr-2" />
              {t('form_submit')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;