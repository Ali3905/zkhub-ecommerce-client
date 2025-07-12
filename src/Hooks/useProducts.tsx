import axios from 'axios';
import { useState, useEffect } from 'react';

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await axios({
          method: "get",
          baseURL: process.env.NEXT_PUBLIC_HOST_URL || "http://localhost:8000/api",
          url: "/products",
        })
        
        
        setProducts(response.data.data);
        // eslint-disable-next-line
      } catch (err: any) {
        setError(err.message);
        console.error('Error fetching products:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);



  return {
    products,
    isLoading,
    error,
  };
};

export default useProducts;