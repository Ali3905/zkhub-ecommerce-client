import React from 'react'
import ProductCard from '../Home/ProductCard'

const ProductList = ({ products }) => {
  return (
    <div className='flex flex-wrap gap-5 justify-between w-full px-[50px]'>
        {
            products.map((pro)=>{
                return <ProductCard product={pro} className={"w-[31%] flex-grow-0"} />
            })
        }
    </div>
  )
}

export default ProductList