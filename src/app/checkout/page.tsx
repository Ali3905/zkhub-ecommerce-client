"use client"
import Form from '@/components/Form';
import { ICartItem } from '@/types/product';
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

const CheckoutPage = () => {
    const [products, setProducts] = useState<ICartItem[] | null>([])
    const [bill, setBill] = useState({
        subTotal: 0,
        shipping: 0,
        total: 0
    })
    // const isLoading = false
    // const error = false


    const getCart = () => {
        setProducts(JSON.parse(localStorage.getItem('cart')) || [])
    };

    useEffect(() => {
        getCart()
    }, [])
    useEffect(() => {
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
        if (products) {
            getBill()
        }
    }, [products])
    return (
        <div className='max-w-[1500px] mx-auto px-[100px] py-[100px]'>
            <h2 className='uppercase font-bold text-[32px]'>Checkout</h2>
            <div className='flex items-start gap-5'>
                <CheckoutForm items={products} />
                <OrderItemsContainer products={products} bill={bill} />
            </div>
        </div>
    )
}

const OrderItemsContainer = ({ products, bill }: { products: ICartItem[] | null, bill: { subTotal: number, shipping: number, total: number } }) => {
    return (
        <div className='min-w-[30%] p-[35px] border mt-10'>
            <p className="text-sm font-semibold text-gray-700 uppercase">YOUR ORDER</p>
            {products ? <div className='py-5 border-b flex flex-col gap-3'>
                {
                    products.map((pro: ICartItem) => {
                        return <div className='flex' key={pro.product._id}>
                            <Image src={pro.product.coverImage} height={130} width={110} alt={pro.product.title} />
                            <div className='flex flex-col justify-between px-4 py-2 w-full'>
                                <div className='flex flex-col'>
                                    <p className='font-semibold'>{pro.product.title}</p>
                                    <p>{pro.product.subTitle}</p>
                                </div>
                                <div className='flex justify-between text-[14px]'><p>({pro.quantity})</p> <p className='font-semibold'>${pro.product.price.retail}</p></div>
                            </div>
                        </div>
                    })
                }
            </div> : "Loading..."}
            <div>
                <div className='font-semibold flex justify-between pt-5'>Subtotal <p>${bill.subTotal}</p></div>
                <div className='font-semibold flex justify-between pb-5 border-b'>Shipping <p>${bill.shipping}</p></div>
                <div className='font-semibold flex justify-between'>Total <p>${bill.total}</p></div>
            </div>
        </div>
    )
}

const CheckoutForm = ({ items }: { items: ICartItem[] | null }) => {
    const steps = [
        {
            name: "Information",
            sections: [
                {
                    label: "CONTACT INFO",
                    fields: [
                        { name: "email", placeholder: "Email", type: "email" },
                        { name: "mobileNumber", placeholder: "Phone", type: "tel" },
                    ]
                },
                {
                    label: "SHIPPING ADDRESS",
                    fields: [
                        { name: "firstName", placeholder: "First Name", type: "text", col: 6 },
                        { name: "lastName", placeholder: "Last Name", type: "text", col: 6 },
                        {
                            name: "country",
                            placeholder: "Country",
                            type: "text",
                            // options: [
                            //     { value: "us", label: "United States" },
                            //     { value: "ca", label: "Canada" },
                            //     { value: "uk", label: "United Kingdom" },
                            //     { value: "pk", label: "Pakistan" },
                            // ]
                        },
                        { name: "state", placeholder: "State/Region", type: "text" },
                        { name: "address", placeholder: "Address", type: "text" },
                        { name: "city", placeholder: "City", type: "text", col: 6 },
                        { name: "postalCode", placeholder: "Postal Code", type: "text", col: 6 },
                    ]
                }
            ]
        },
    ];

    const handleFormSubmit = async (data) => {
        if (!items) {
            alert("Atleast Add one item in cart to place order")
            return;
        }

        // items = []
        for (const item of items) {
            item.dialColor = item.product.variants[item.variantIndex].dialColor
            item.strapColor = item.product.variants[item.variantIndex].strapColor
        }
        try {
            console.log('Form submitted with data:', data);
            const res = await axios({
                method: "post",
                baseURL: process.env.NEXT_PUBLIC_HOST_URL,
                url: "/orders",
                data: { items, shippingAddress: data, billingAddress: data, paymentMethod: "CASH_ON_DELIVERY", shippingCost: 10 }
            })
            alert(`Order Placed! \n Subtotal: \t $${res.data.data.order.subtotal}\n Shipping: \t $${res.data.data.order.shippingCost}\n Total: \t $${res.data.data.order.totalAmount}\n`);
        } catch (error) {
            alert(error?.response?.data?.message || "Could not place order please try again")
        }
    };

    return (
        <div className="flex-grow">
            <Form
                steps={steps}
                onSubmit={handleFormSubmit}
                submitButtonText="Complete Order"
                nextButtonText="Continue"
                prevButtonText="Back"
                className='max-w-none'
            />
        </div>
    );
};
export default CheckoutPage