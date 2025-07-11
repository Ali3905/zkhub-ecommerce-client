import Navbar from '@/components/Navbar'
import React from 'react'
import ProductDetails from './ProductDetails'

const page = ({ params }) => {
  return (
    <div>
        <Navbar />
        <ProductDetails id={params.productId} />
    </div>
  )
}

export default page