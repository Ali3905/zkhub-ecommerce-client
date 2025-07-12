import React from 'react'
import ProductCard from '../Home/ProductCard'
import { IProduct } from '@/types/product'

const ProductList = ({ products }: { products: IProduct[] }) => {
  return (
    <div className='flex flex-wrap gap-5 justify-between w-full px-[50px]'>
      {
        products.map((pro: IProduct) => {
          return <ProductCard product={pro} className={"w-[31%] flex-grow-0"} key={pro._id} />
        })
      }
    </div>
  )
}

export default ProductList