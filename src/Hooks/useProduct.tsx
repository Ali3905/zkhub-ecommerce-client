import { IProduct } from '@/types/product';
import axios from 'axios';
import { useState, useEffect } from 'react';

const useProduct = ({ id }: { id : number }) => {
  const [data, setData] = useState<IProduct | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await axios({
        method: "get",
        baseURL: "http://localhost:8000/api",
        url: `/products/${id}`,
      })
      
      
      setData(response.data.data);
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching products:', err);
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

export default useProduct;