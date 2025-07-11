"use client"
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import ProductCard from './ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Navigation } from 'swiper/modules';
import useProducts from '../../Hooks/useProducts';
import { useRouter } from 'next/navigation';

const RecentProducts = ({ }) => {
    const { products, isLoading, error } = useProducts()
    const router = useRouter()

    if (isLoading) return <div>Loading products...</div>;
    if (error) return <div>Error: {error}</div>;
    return (
        <div className='max-w-[1500px] mx-auto px-[70px]'>
            <span className='flex justify-between items-end mb-[20px] mt-[100px] cursor-pointer' onClick={()=>router.push("/products")}>
                <h2 className='font-bold text-[48px] leading-[40px]'>New <br /> This Week</h2>
                <p>See All</p>
            </span>
            <Swiper
                spaceBetween={20}
                slidesPerView={3.6}
                loop
                navigation={{ nextEl: ".next", prevEl: ".prev" }}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                modules={[Navigation]}
            >
                <div>
                    {
                        products.map((pro) => {
                            return <SwiperSlide key={pro._id}>
                                <ProductCard product={pro} />
                            </SwiperSlide>
                        })
                    }
                </div>
            </Swiper>
            <div className='flex justify-center gap-4 mt-[50px]'>
                <button className='bg-gray-200 px-4 py-2 cursor-pointer prev'><ChevronLeft /></button>
                <button className='bg-gray-200 px-4 py-2 cursor-pointer next'><ChevronRight /></button>
            </div>
        </div>
    )
}



export default RecentProducts