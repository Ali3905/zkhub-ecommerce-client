"use client"
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import ProductCard from './ProductCard';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Navigation } from 'swiper/modules';

const Collections = ({ products }) => {
    return (
        <div className='max-w-[1500px] mx-auto px-[70px]'>
            <span className='flex justify-between items-end mb-[20px] mt-[100px] border-b pb-[10px]'>
                <span>
                    <h2 className='font-bold text-[48px] leading-[40px]'>XIV <br /> COLLECTIONS <br /> 23-24</h2>
                    <ul className='flex gap-2 mt-[10px]'>
                        <li className='font-bold'>(All)</li>
                        <li>Men</li>
                        <li>Women</li>
                        <li>KID</li>
                    </ul>
                </span>
                <p>Filters</p>
            </span>
            <div className='flex justify-between gap-[20px]'>
                {
                    products.map((pro, index) => {
                        if(index > 2) return;
                        return <ProductCard product={pro} key={pro._id} />
                    })
                }
            </div>
            <div className='flex flex-col items-center gap- mt-[50px]'>
                <p>See More</p>
                <ChevronDown />
            </div>
        </div>
    )
}



export default Collections