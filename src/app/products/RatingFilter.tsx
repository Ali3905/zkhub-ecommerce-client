import React from 'react';

const RatingFilter = ({ title, maxRating = 5, value = [], onChange }) => {
    const handleRatingClick = (rating) => {
        const newValue = value.includes(rating)
            ? value.filter(r => r !== rating)
            : [...value, rating];
        onChange(newValue);
    };

    return (
        <div className="filter-group">
            <h3 className="font-semibold text-gray-800 mb-3">{title}</h3>
            <div className="space-y-2">
                {[...Array(maxRating)].map((_, index) => {
                    const rating = maxRating - index;
                    return (
                        <label key={rating} className="flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={value.includes(rating)}
                                onChange={() => handleRatingClick(rating)}
                                className="mr-2 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                            />
                            <div className="flex items-center">
                                {[...Array(rating)].map((_, i) => (
                                    <span key={i} className="text-yellow-400">★</span>
                                ))}
                                {[...Array(maxRating - rating)].map((_, i) => (
                                    <span key={i} className="text-gray-300">★</span>
                                ))}
                                <span className="ml-1 text-sm text-gray-600">
                                    {rating} star{rating !== 1 ? 's' : ''} & up
                                </span>
                            </div>
                        </label>
                    );
                })}
            </div>
        </div>
    );
};

export default RatingFilter;