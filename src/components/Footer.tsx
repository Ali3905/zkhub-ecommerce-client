import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from 'lucide-react'
import React from 'react'
import Categories from './FooterCategories'

const Footer = () => {
    return (
        <div className='max-w-[1500px] mx-auto px-[20px] sm:px-[70px] py-[50px] flex gap-5 justify-between bg-gray-300 mt-[50px]'>
            <Address />
            <Categories />
            <NewsLetterSignup />
        </div>
    )
}

const Address = () => {
    return (
        <div className='flex flex-col gap-2 basis-[33%]'>
            <h3 className='font-semibold text-[20px] uppercase'>Get in Touch</h3>
            <h1 className='font-bold'>ZKHUb</h1>
            <p className='flex items-start gap-2'> <MapPin /> Khan mobile main murree road shamsabad Rawalpindi, shop # 05</p>
            <p className='flex items-start gap-2'> <Mail />zkhub8384@gmail.com</p>
            <p className='font-bold'>Whatsapp Chat Support <br /> (10 am to 5 pm MON to SAT) Only Chat</p>
            <p className='flex items-start gap-2'> <Phone />+92 231 4323532</p>
            <div className='flex gap-4'>
                <Facebook />
                <Instagram />
                <Youtube />
                <Twitter />
            </div>
        </div>
    )
}




const NewsLetterSignup = () => {
    return (
        <div className='flex flex-col gap-2 basis-[33%]'>
            <h3 className='font-semibold text-[20px] uppercase'>NewLetter Signup</h3>
            <p className='sm:max-w-[60%]'>Subscribe to our newsletter to get offers and updates</p>
            <label htmlFor="newsLetter" className='border rounded-full pl-4 -2 flex justify-between'>
                <input type="email" placeholder='Your email address' name='newsLetter' id='newsLetter' className='outline-none' />
                <button className='px-4 py-2 rounded-full text-white bg-black font-bold'>Subscribe</button>
            </label>
        </div>
    )
}

export default Footer