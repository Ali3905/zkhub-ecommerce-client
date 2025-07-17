import { IProduct } from '@/types/product'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

interface ProductCardProps {
  product: IProduct,
  className?: string,
}

const ProductCard = ({ product, className }: ProductCardProps) => {
  console.log({product});
  
  const router = useRouter()
  return (
    <div className={`max-w-[430px] flex-grow cursor pointer ${className}`} onClick={() => router.push(`/product/${product._id}`)}>
      <Image src={product.coverImage} height={300} width={300} alt={product.title} className='w-full aspect-square' />
      <p className='text-[12px]'>{product.title}</p>
      <span className='flex justify-between font-semibold'>
        <p>{product.subTitle}</p>
        <span className='flex flex-col'>
          <p className='text-red-400 line-through'>${product.price.display}</p>
          <p>${product.price.retail}</p>
        </span>
      </span>

    </div>
  )
}

export default ProductCard