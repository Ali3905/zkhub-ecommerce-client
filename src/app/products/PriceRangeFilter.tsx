import React from 'react';

const PriceRangeFilter = ({ title, currency = 'Rs', value = { min: '', max: '' }, onChange }) => {
  const handleMinChange = (e) => {
    onChange({ ...value, min: e.target.value });
  };

  const handleMaxChange = (e) => {
    onChange({ ...value, max: e.target.value });
  };

  return (
    <div className="filter-group">
      <h3 className="font-semibold text-gray-800 mb-3">{title}</h3>
      <div className="space-y-2">
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            {currency}
          </span>
          <input
            type="number"
            placeholder="Min price"
            value={value.min}
            onChange={handleMinChange}
            className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            {currency}
          </span>
          <input
            type="number"
            placeholder="Max price"
            value={value.max}
            onChange={handleMaxChange}
            className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
};

export default PriceRangeFilter;