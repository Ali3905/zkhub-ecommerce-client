"use client"
import { Menu } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import SearchBar from './Search'
import Link from 'next/link'

const Navbar = ({ handleOpenSidebar }) => {
    const router = useRouter()
    const [showSearch, setShowSearch] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100 && window.innerWidth > 768) {
                setShowSearch(true)
            } else {
                setShowSearch(false)
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])


    return (
        <div className='flex items-center justify-between pt-[30px] pb-[10px] sm:px-[70px] px-[10px]  sticky top-0 left-0 bg-white z-50'>
            <div className='flex gap-[20px] items-center'>
                {<Menu className='md:hidden block opacity-0' onClick={handleOpenSidebar} />}
                <ul className='flex gap-[20px] items-center font-semibold'>
                    <Link href={"/"} className='cursor-pointer hidden sm:block'><li>Home</li></Link>
                    <div>
                        {showSearch && <SearchBar />}
                    </div>
                </ul>
            </div>
            <Image width={35} height={35} alt='logo' src={"/logo.jpg"} className='w-[50px] aspect-square' />
            <div className='flex items-center gap-[20px]'>
                <button className='bg-black rounded-full px-5 py-2 text-white h-full cursor-pointer' onClick={() => router.push("/cart")}>Cart</button>
            </div>
        </div>
    )
}

export default Navbar
