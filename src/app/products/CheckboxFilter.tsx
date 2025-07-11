// filters/CheckboxFilter.js
import React from 'react';

const CheckboxFilter = ({ title, options, value = [], onChange }) => {
  const handleCheckboxChange = (optionValue) => {
    const newValue = value.includes(optionValue)
      ? value.filter(v => v !== optionValue)
      : [...value, optionValue];
    onChange(newValue);
  };

  return (
    <div className="filter-group">
      <h3 className="font-semibold text-gray-800 mb-3">{title}</h3>
      <div className="space-y-2">
        {options.map(option => (
          <label key={option.value} className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={value.includes(option.value)}
              onChange={() => handleCheckboxChange(option.value)}
              className="mr-2 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default CheckboxFilter;