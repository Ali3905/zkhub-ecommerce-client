"use client"
import React, { useEffect, useState } from 'react'
import ProductCard from '../Home/ProductCard'
import { Minus, Plus, XCircle } from 'lucide-react'
import { ICartItem, IProduct } from '@/types/product'
import { useRouter } from 'next/navigation'

const page = () => {
    // const { products, isLoading, error } = useProducts()
    const [products, setProducts] = useState<ICartItem[] | null >([])
    const [bill, setBill] = useState({
        subTotal: 0,
        shipping: 0,
        total: 0
    })
    const isLoading = false
    const error = false

    const getBill = () => {
        let sum = 0;
        products?.forEach((pro: ICartItem) => {
            sum += Number(pro.product.price.retail)
        })
        setBill({
            subTotal: sum,
            shipping: 10,
            total: sum + 10
        })
    }
    const getCart = () => {
        setProducts(JSON.parse(localStorage.getItem('cart')) || [])
    };

    const removeFromCart = (productId: string) => {
        let cart = products?.filter((item: ICartItem) => item.product._id !== productId) || [] ;
        setProducts(cart)
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    const updateQuantity = (productId: string, newQuantity: number) => {
        let cart = products ? [...products] : [];
        const item = cart.find((item: ICartItem) => item.product._id === productId);
        if (item) {
            item.quantity = newQuantity;
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    };
    useEffect(() => {
        getCart()
    }, [])

    useEffect(() => {
        if (products) {
            getBill()
        }
    }, [products])

    return (
        <div className='max-w-[1500px] mx-auto px-[100px]'>
            <h2 className='font-bold text-[48px] border-b mb-[20px]'>Cart</h2>
            <div className='flex items-start'>
                {
                    isLoading ? <p>Loading...</p> : error ? <p>{error}</p> : products ? <div className='flex gap-5 flex-wrap basis-[70%]'>
                        {
                            products.map((pro: ICartItem) => {
                                return <CartItem product={pro} handleRemove={removeFromCart} updateQuantity={updateQuantity} />
                            })
                        }
                    </div> : "No Items in cart"
                }

                <BillCard bill={bill} />
            </div>
        </div>
    )
}

const CartItem = ({ product, handleRemove, updateQuantity }: { product: ICartItem, handleRemove: (productId: string) => void, updateQuantity: (productId: string, newQuantity: number) => void }) => {
    const [counter, setCounter] = useState<number>(product.quantity)

    const increment = () => {
        setCounter(prev => prev + 1)
        updateQuantity(product.product._id, product.quantity + 1)
    }

    const decrement = () => {
        if (counter <= 1) {
            return;
        }
        setCounter(prev => prev - 1)
        updateQuantity(product.product._id, product.quantity - 1)
    }

    return (
        <div className='flex gap-2 w-[45%] flex-grow-0'>
            <ProductCard product={product.product} className={"w-full flex-grow-0"} />
            <div className='flex flex-col'>
                <XCircle className='cursor-pointer' onClick={() => handleRemove(product.product._id)} />
                <div className='mt-[50px]'>
                    <p>L</p>
                    <div className='w-full h-[40px] bg-black aspect-square mb-[10px]'></div>
                    <span>
                        <p className='p-2 border text-center cursor-pointer' onClick={increment}><Plus /></p>
                        <p className='p-2 border text-center'>{counter}</p>
                        <p className='p-2 border text-center cursor-pointer' onClick={decrement} ><Minus /></p>
                    </span>
                </div>
            </div>
        </div>
    )
}

const BillCard = ({ bill }: { bill: { subTotal: number, shipping: number, total: number } }) => {
    const router = useRouter()
    return (
        <div className='basis-[30%] px-[40px] py-[50px] flex flex-col gap-4 border max-h-fit'>
            <p className='font-semibold text-[16px] uppercase'>Order Summary</p>
            <p className='font-medium flex justify-between'>Subtotal <p>${bill.subTotal}</p></p>
            <p className='font-medium flex justify-between'>Shipping <p>${bill.shipping}</p></p>

            <p className='font-medium  pt-[20px] border-t flex justify-between'>TOTAL(TAX INCL.) <p>${bill.total}</p></p>
            <button className='py-4 bg-gray-300 cursor-pointer' onClick={()=>router.push("/checkout")}>CONTINUE</button>
        </div>
    )
}

export default page