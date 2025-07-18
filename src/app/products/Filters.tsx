import React from 'react';
import { filterConfig } from './FiltersConfig';
import { ChevronLeft } from 'lucide-react';

const FilterComponent = ({ filters, onFilterChange, onClearAll, handleClose, isOpen }) => {

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
    <>
      {
        (isOpen || window.innerWidth > 768) &&
        <div className="fixed top-0 left-0 h-full w-full sm:fit bg-gray-500/50 sm:bg-transparent z-50" onClick={handleClose}>
          <div className="bg-white p-6 rounded-lg shadow-sm h-full w-fit " onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Filters</h2>
              <span className='flex flex-col gap-2 items-center'>
                <ChevronLeft className='bg-gray-200 rounded-full p-1 cursor-pointer' onClick={handleClose} />
                <button
                  onClick={onClearAll}
                  className="text-sm text-blue-600 hover:text-blue-800 underline"
                >
                  Clear All
                </button>
              </span>
            </div>

            <div className="space-y-6">
              {filterConfig.map(renderFilter)}
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default FilterComponent;