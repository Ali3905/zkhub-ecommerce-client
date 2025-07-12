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
      currency: '$'
    }
  },
  {
    key: 'categories',
    component: SelectFilter,
    props: {
      title: 'Categories',
      options: [
        { value: 'shirts', label: 'Shirts' },
        { value: 'pants', label: 'Pants' },
        { value: 'shoes', label: 'Shoes' },
        { value: 'accessories', label: 'Accessories' },
        { value: 'jackets', label: 'Jackets' }
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