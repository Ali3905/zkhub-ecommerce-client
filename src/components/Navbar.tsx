"use client"
import { Menu } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import SearchBar from './Search'

const Navbar = () => {
    const router = useRouter()
    const [showSearch, setShowSearch] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setShowSearch(true)
            } else {
                setShowSearch(false)
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])


    return (
        <div className='flex items-center justify-between py-[30px] px-[70px] sticky top-0 left-0 bg-white z-50'>
            <div className='flex gap-[20px] items-center'>
                <Menu className='md:hidden block' />
                <ul className='flex gap-[20px] items-center font-semibold'>
                    <li>Home</li>
                    <div>
                        {showSearch && <SearchBar />}
                    </div>
                </ul>
            </div>
            <Image width={35} height={35} alt='logo' src={"/logo.png"} className='w-[35px] aspect-square' />
            <div className='flex items-center gap-[20px]'>
                <button className='bg-black rounded-full px-5 py-2 text-white h-full cursor-pointer' onClick={() => router.push("/cart")}>Cart</button>
            </div>
        </div>
    )
}

export default Navbar
