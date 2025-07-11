"use client"
import useProducts from '@/Hooks/useProducts'
import React from 'react'
import ProductTable from './ProductsTable'
import { useRouter } from 'next/navigation'

const page = () => {
  const { products, isLoading, error } = useProducts()
  const router = useRouter()
  return (
    <div className='px-[50px] py-[20px]'>
      <div className='flex justify-between items-center mb-2'>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Products</h2>
        <button className='bg-gray-300 font-semibold px-10 py-2 rounded-md' onClick={()=>router.push("/admin/Products/create")}>Create</button>
      </div>
      {
        products && !isLoading ? <ProductTable products={products} /> : isLoading ? <p>Loading...</p> : <p>{error}</p>
      }
    </div>
  )
}

export default page