import { IProduct } from '@/types/product';
import axios from 'axios';
import { useState, useEffect } from 'react';

const useProduct = ({ id }: { id: number }) => {
  const [data, setData] = useState<IProduct | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await axios({
          method: "get",
          baseURL: process.env.NEXT_PUBLIC_HOST_URL || "http://localhost:8000/api",
          url: `/products/${id}`,
        })


        setData(response.data.data);
        // eslint-disable-next-line
      } catch (err: any) {
        setError(err.message);
        console.error('Error fetching products:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);


  return {
    data,
    isLoading,
    error,
  };
};

export default useProduct;
