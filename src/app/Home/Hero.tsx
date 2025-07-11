import { ChevronRightIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import SearchBar from '../../components/Search'

const Hero = () => {
    return (
        <div className='max-w-[1600px] mx-auto px-[70px]'>
            <div className='flex flex-col items-start'>
                <p>Men</p>
                <p>Women</p>
                <p>Kids</p>
            <SearchBar />
            </div>
            <div className='flex gap-[10px] max-h-[400px] mt-[50px]'>
                <div className='flex-grow-[1.3] flex flex-col justify-between'>
                    <span>
                        <h2 className='font-bold text-[48px] max-w-[30%] leading-[40px]'>New Collection</h2>
                        <p className='max-w-[10%] leading-[] mt-[10px] text-[16px] '>Summer 2024</p>
                    </span>
                    <button className='bg-gray-200 flex justify-between px-[10px] py-[5px] w-full font-medium text-[16px]'>Go To Shop <ChevronRightIcon /></button>
                </div>
                <Image src={"/hero1.png"} width={370} height={370} alt={"Hero"} className='flex-grow aspect-square' />
                <Image src={"/hero2.png"} width={370} height={370} alt={"Hero"} className='flex-grow aspect-square' />

            </div>
        </div>
    )
}

export default Hero