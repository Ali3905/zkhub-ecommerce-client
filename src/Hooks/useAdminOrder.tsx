import { IOrder } from '@/types/order';
import axios from 'axios';
import { useState, useEffect } from 'react';

const useAdminOrder = ({ id }: { id: string }) => {
    const [data, setData] = useState<IOrder | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await axios({
                method: "get",
                baseURL: process.env.NEXT_PUBLIC_HOST_URL,
                url: `/orders/${id}`,
            })

            setData(response.data.data.order);
        } catch (err: any) {
            setError(err.message);
            console.error('Error fetching order:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const refetch = () => {
        fetchData();
    };

    return {
        data,
        isLoading,
        error,
        refetch
    };
};

export default useAdminOrder;