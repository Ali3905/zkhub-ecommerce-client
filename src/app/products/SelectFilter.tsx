import React from 'react';

const SelectFilter = ({ title, options, value = [], onChange, multiple = false }) => {
  const handleSelectChange = (e) => {
    if (multiple) {
      const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
      onChange(selectedOptions);
    } else {
      onChange([e.target.value]);
    }
  };

  const handleCheckboxChange = (optionValue) => {
    const newValue = value.includes(optionValue)
      ? value.filter(v => v !== optionValue)
      : [...value, optionValue];
    onChange(newValue);
  };

  if (multiple) {
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
  }

  return (
    <div className="filter-group">
      <h3 className="font-semibold text-gray-800 mb-3">{title}</h3>
      <select
        value={value[0] || ''}
        onChange={handleSelectChange}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="">Select {title}</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectFilter;