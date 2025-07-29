// filterConfig.js
// import CheckboxFilter from './CheckboxFilter';
import PriceRangeFilter from './PriceRangeFilter';
import SelectFilter from './SelectFilter';
// import RatingFilter from './RatingFilter';

export const filterConfig = [
  // {
  //   key: 'sizes',
  //   component: CheckboxFilter,
  //   props: {
  //     title: 'Size',
  //     options: [
  //       { value: 'XS', label: 'Extra Small' },
  //       { value: 'S', label: 'Small' },
  //       { value: 'M', label: 'Medium' },
  //       { value: 'L', label: 'Large' },
  //       { value: 'XL', label: 'Extra Large' },
  //       { value: 'XXL', label: 'Double XL' }
  //     ]
  //   }
  // },
  {
    key: 'priceRange',
    component: PriceRangeFilter,
    props: {
      title: 'Price Range',
      currency: 'Rs'
    }
  },
  {
    key: 'categories',
    component: SelectFilter,
    props: {
      title: 'Categories',
      options: [
        { value: 'airpods', label: 'Air Pods' },
        { value: 'mobileCovers', label: 'Mobile Covers' },
        { value: 'cables', label: 'Cables' },
        { value: 'chargers', label: 'Chargers' },
      ],
      multiple: true
    }
  },
  // {
  //   key: 'ratings',
  //   component: RatingFilter,
  //   props: {
  //     title: 'Ratings',
  //     maxRating: 5
  //   }
  // }
];