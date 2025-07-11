"use client"
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const SearchBar = () => {
    const [query, setQuery] = useState("")
    const router = useRouter()
    return (
        <div className='flex gap-2 '>
            <label htmlFor="search" className='bg-gray-200 flex justify-start items-center px-[13px] py-[8px]'>
                <Search size={13} />
                <input type="search" name="search" id="search" className='outline-none text-right' placeholder='eg. OceanX Watch' onChange={(e) => setQuery(e.target.value)} />
            </label>
                <button onClick={() => router.push(`/products?q=${query}`)} className='bg-gray-500 px-[13px] text-white rounded-sm cursor-pointer'>Search</button>
        </div>
    )
}

export default SearchBar