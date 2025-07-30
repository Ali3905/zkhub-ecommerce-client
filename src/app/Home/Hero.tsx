"use client"
import { ChevronRightIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import SearchBar from '../../components/Search'
import { useRouter } from 'next/navigation'

const Hero = () => {
    const router = useRouter()
    return (
        <div className='max-w-[1600px] mx-auto sm:px-[70px] px-[10px]'>
            <div className='flex flex-col items-start'>
                <p onClick={() => router.push(`/products?q=airpods`)} className='text-md cursor-pointer hover:text-blue-400'>Air Pods</p>
                <p onClick={() => router.push(`/products?q=mobileCovers`)} className='text-md cursor-pointer hover:text-blue-400'>Mobile Covers</p>
                <p onClick={() => router.push(`/products?q=chargers`)} className='text-md cursor-pointer hover:text-blue-400'>Chargers</p>
                
                <SearchBar />
            </div>
            <div className='flex flex-col sm:flex-row gap-[10px] mt-[50px]'>
                <div className='flex-grow flex flex-col justify-between'>
                    <span>
                        <h2 className='font-bold text-[48px] max-w-[30%] leading-[40px]'>New Collection</h2>
                        <p className='max-w-[10%] leading-[] mt-[10px] text-[16px] '>Summer 2024</p>
                    </span>
                    <button className='bg-gray-200 hidden sm:flex justify-between px-[10px] py-[5px] w-full font-medium text-[16px] cursor-pointer' onClick={()=>router.push("/products")} >Go To Shop <ChevronRightIcon /></button>
                </div>
                <div className='flex gap-2 mt-[10px] sm:mt-0'>
                    <Image src={"/banner1.jpg"} width={370} height={370} alt={"Hero"} className='border border-gray-200 h-[200px] sm:h-[400px] aspect-[9/12] ' />
                    <Image src={"/banner1.jpg"} width={370} height={370} alt={"Hero"} className='border border-gray-200 h-[200px] sm:h-[400px] aspect-[9/12] ' />
                </div>
                <button className='bg-gray-200 flex sm:hidden justify-between px-[10px] py-[5px] w-full font-medium text-[16px] mt-[10px]'>Go To Shop <ChevronRightIcon /></button>

            </div>
        </div>
    )
}

export default Hero