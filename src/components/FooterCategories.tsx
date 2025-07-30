"use client"
import { useRouter } from "next/navigation"

const Categories = () => {
    const router = useRouter()
    return (
        <div className='flex flex-col gap-2'>
            <h3 className='font-semibold text-[20px] uppercase'>Categories</h3>
            <p onClick={() => router.push(`/products?q=airpods`)} className='text-md cursor-pointer hover:text-blue-400'>Air Pods</p>
            <p onClick={() => router.push(`/products?q=mobileCovers`)} className='text-md cursor-pointer hover:text-blue-400'>Mobile Covers</p>
            <p onClick={() => router.push(`/products?q=chargers`)} className='text-md cursor-pointer hover:text-blue-400'>Chargers</p>
            <p onClick={() => router.push(`/products?q=cables`)} className='text-md cursor-pointer hover:text-blue-400'>Cables</p>
        </div>
    )
}
export default Categories