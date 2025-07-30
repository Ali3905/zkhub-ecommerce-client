"use client"
import { DynamicField, FormField } from '@/components/Form';
import { ICartItem } from '@/types/product';
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';

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
                sum += Number(pro.product.price.retail);
            });

            const shipping = products && products.length > 0 ? 10 : 0;

            setBill({
                subTotal: sum,
                shipping: shipping,
                total: sum + shipping,
            });
        };

        if (products) {
            getBill();
        }
    }, [products]);
    return (
        <div className='max-w-[1500px] mx-auto px-[10px] sm:px-[100px] py-[20px] sm:py-[100px]'>
            <h2 className='uppercase font-bold text-[32px]'>Checkout</h2>
            <div className='flex flex-col sm:flex-row items-start gap-5'>
                <CheckoutForm items={products} />
                <OrderItemsContainer products={products} bill={bill} />
            </div>
        </div>
    )
}

const OrderItemsContainer = ({ products, bill }: { products: ICartItem[] | null, bill: { subTotal: number, shipping: number, total: number } }) => {
    return (
        <div className='min-w-[30%] w-full sm:w-auto p-[20px] sm:p-[35px] border mt-10'>
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
                                <div className='flex justify-between text-[14px]'><p>({pro.quantity})</p> <p className='font-semibold'>Rs. {pro.product.price.retail}</p></div>
                            </div>
                        </div>
                    })
                }
            </div> : "Loading..."}
            <div>
                <div className='font-semibold flex justify-between pt-5'>Subtotal <p>Rs. {bill.subTotal}</p></div>
                <div className='font-semibold flex justify-between pb-5 border-b'>Shipping <p>Rs. {bill.shipping}</p></div>
                <div className='font-semibold flex justify-between'>Total <p>Rs. {bill.total}</p></div>
            </div>
        </div>
    )
}

const CheckoutForm = ({ items }) => {
    const isSubmitting = false;
    const { register, handleSubmit, control, formState: { errors }, reset } = useForm({
        defaultValues: {
            variants: []
        }
    });


    const formFields = [
        { name: "email", placeholder: "Email", type: "email", validations: { required: "Email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email format" } } },
        { name: "mobileNumber", placeholder: "Phone", type: "tel", validations: { required: "Phone number is required", pattern: { value: /^\d{11}$/, message: "Phone number must be 11 digits" } } },
        { name: "firstName", placeholder: "First Name", type: "text", col: 6, validations: { required: "First name is required" } },
        { name: "lastName", placeholder: "Last Name", type: "text", col: 6, validations: { required: "Last name is required" } },
        { name: "state", placeholder: "State", type: "text", col: 6, validations: { required: "State is required" } },
        { name: "address", placeholder: "Address", type: "text", col: 6, validations: { required: "Address is required" } },
        { name: "city", placeholder: "City", type: "text", col: 6, validations: { required: "City is required" } },
    ];


    const onSubmit = async (data) => {
        if (!items) {
            alert("Atleast Add one item in cart to place order")
            return;
        }

        // items = []
        for (const item of items) {
            item.color = item.product.variants[item.variantIndex].color
            item.model = item?.product?.variants?.[item.variantIndex]?.model || ""
        }
        try {
            console.log('Form submitted with data:', data);
            const res = await axios({
                method: "post",
                baseURL: process.env.NEXT_PUBLIC_HOST_URL,
                url: "/orders",
                data: { items, shippingAddress: data, billingAddress: data, paymentMethod: "CASH_ON_DELIVERY", shippingCost: 10 }
            })
            localStorage.removeItem("cart")
            alert(`Order Placed! \n Subtotal: \t Rs. ${res.data.data.order.subtotal}\n Shipping: \t Rs. ${res.data.data.order.shippingCost}\n Total: \t Rs. ${res.data.data.order.totalAmount}\n`);
        } catch (error) {
            alert(error?.response?.data?.message || "Could not place order please try again")
        }
    };

    return (
        <div className="flex-grow p-6 bg-white">
            {/* <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Create Product</h1>
                <p className="text-gray-600 mt-2">Fill in the details to create a new product</p>
            </div> */}

            <div className="space-y-8">
                {/* Basic Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {formFields.map((field) => (
                        <div key={field.name} className={field.type === 'textarea' || field.type === 'file' ? 'md:col-span-2' : ''}>
                            <FormField
                                label={field.placeholder}
                                required={field.validations?.required}
                                error={errors[field.name]}
                            >
                                <DynamicField
                                    field={field}
                                    register={register}
                                    control={control}
                                    errors={errors}
                                />
                            </FormField>
                        </div>
                    ))}
                </div>

                {/* Submit Button */}
                <div className="flex items-center justify-end space-x-4 pt-6 border-t">
                    <button
                        type="button"
                        onClick={() => reset()}
                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                        Reset
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit(onSubmit)}
                        disabled={isSubmitting}
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                    >
                        {isSubmitting && (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        )}
                        <span>{isSubmitting ? 'Loading...' : 'Checkout'}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
export default CheckoutPage