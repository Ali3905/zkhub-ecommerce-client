"use client"
import useAdminOrder from '@/Hooks/useAdminOrder'
import { useParams } from 'next/navigation'
import React from 'react'
import OrderDetails from './OrderDetailsContainer'

const OrderPage = () => {
    const { orderId } = useParams()
    const { data, error, isLoading } = useAdminOrder({ id: orderId?.toString() || "" })
    return (
        <div>
            {
                isLoading ? <p>Loading...</p> : error ? <p>{error}</p> : (data && <OrderDetails order={data} key={data?._id} />)
            }
        </div>
    )
}

export default OrderPage