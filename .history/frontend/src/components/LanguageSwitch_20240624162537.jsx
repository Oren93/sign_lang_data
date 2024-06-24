// src/components/LanguageSwitcher.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import enFlag from '../flags/en.png';
import isFlag from '../flags/is.png';

const options = [
  { value: 'en', label: <img src={enFlag} alt="English" style={{ width: '20px', marginRight: '8px' }} /> },
  { value: 'is', label: <img src={isFlag} alt="Icelandic" style={{ width: '20px', marginRight: '8px' }} /> },
];

const customStyles = {
  control: (provided) => ({
    ...provided,
    width: 150,
  }),
  option: (provided) => ({
    ...provided,
    display: 'flex',
    alignItems: 'center',
  }),
};

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleChange = (selectedOption) => {
    i18n.changeLanguage(selectedOption.value);
  };

  return (
    <Select
      defaultValue={options.find(option => option.value === i18n.language)}
      options={options}
      onChange={handleChange}
      styles={customStyles}
      isSearchable={false}
    />
  );
};

export default LanguageSwitcher;
