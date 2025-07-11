import React from 'react';
import { filterConfig } from './FiltersConfig';

const FilterComponent = ({ filters, onFilterChange, onClearAll }) => {
  const handleFilterUpdate = (filterKey, value) => {
    const newFilters = { ...filters, [filterKey]: value };
    onFilterChange(newFilters);
  };

  const renderFilter = (filterItem) => {
    const { key, component: FilterComponentType } = filterItem;

    return (
      <FilterComponentType
        key={key}
        value={filters[key]}
        onChange={(value) => handleFilterUpdate(key, value)}
        {...filterItem.props}
      />
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Filters</h2>
        <button
          onClick={onClearAll}
          className="text-sm text-blue-600 hover:text-blue-800 underline"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-6">
        {filterConfig.map(renderFilter)}
      </div>
    </div>
  );
};

export default FilterComponent;