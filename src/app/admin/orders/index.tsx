import { IOrder } from '@/types/order'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import OrderTable from './OrdersList'


const Index = () => {
    const [orders, setOrders] = useState<null | IOrder[]>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    
    const handleGetOrders = async () => {
        setIsLoading(true)
        try {
            const res = await axios({
                method: "get",
                baseURL: process.env.NEXT_PUBLIC_HOST_URL,
                url: "/orders/admin/all"
            })
            setOrders(res.data.data.orders)
        } catch (error) {
            alert("Could not get fetch the orders")
            console.log(error);
            
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        handleGetOrders()
    }, [])
    return (
        <div className='px-[50px] py-[20px]'>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Orders</h2>
            {
               orders && !isLoading ? <OrderTable orders={orders} /> : isLoading ? <p>Loading...</p> : <p>Error</p>
            }
        </div>
    )
}

export default Index