import React from 'react';
import { useTranslation } from 'react-i18next';
import { Download } from 'lucide-react';

const DataAccess = () => {
  const { t } = useTranslation('data_access');

  const handleDownload = () => {
    // Implement download logic here
    console.log('Downloading dataset...');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">{t('title')}</h1>
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-4">{t('data_format_title')}</h2>
        <p className="mb-4">{t('data_format_description')}</p>
        <h2 className="text-2xl font-semibold mb-4">{t('download_title')}</h2>
        <p className="mb-4">{t('download_description')}</p>
        <button
          onClick={handleDownload}
          className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center"
        >
          <Download size={18} className="mr-2" />
          {t('download_button')}
        </button>
      </div>
    </div>
  );
};

export default DataAccess;