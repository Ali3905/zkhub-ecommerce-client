"use client"
import React, { Suspense, useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import Filters from './Filters'
import ProductList from './ProductList'
import useProducts from '../../Hooks/useProducts'
import { IProduct } from '@/types/product'
import { useSearchParams } from 'next/navigation'

interface Filters {
  sizes?: string[],
  priceRange: { min: string, max: string },
  categories: string[],
  ratings?: string[],
}



const AllProductsPage = () => {
  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = () => {
    setIsOpen(true)
  }
  const handleClose = () => {
    setIsOpen(false)
  }
  return (
    <div>
      <Navbar handleOpenSidebar={handleOpen} />
      <Suspense fallback={"Loading..."}>
        <PageContainer handleCloseSidebar={handleClose} isOpen={isOpen} />
      </Suspense>
    </div>
  )
}

export default AllProductsPage

const PageContainer = ({ handleCloseSidebar, isOpen }) => {
  const { products, isLoading, error } = useProducts()
  const searchParams = useSearchParams()
  const q = searchParams.get("q")

  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>(products);
  const [filters, setFilters] = useState<Filters>({
    // sizes: [],
    priceRange: { min: '', max: '' },
    categories: [],
    // ratings: []
  });

  useEffect(() => {
    let filtered = [...products];
    if (q) {
      if (q && q !== "") {
        filtered = filtered.filter((product: IProduct) => {
          return product.title.toLowerCase().includes(q.toLowerCase()) || product?.subTitle?.toLowerCase().includes(q.toLowerCase()) || product.description.toLowerCase().includes(q.toLowerCase()) || product?.category?.includes(q.toLowerCase())
        })
      }
      setFilters({
        ...filters, categories: [...filters.categories, q]
      })
      setFilteredProducts(filtered);
    }
    // eslint-disable-next-line
  }, [q])

  // Apply filters whenever filters or products change
  useEffect(() => {
    let filtered = [...products];

    console.log({ filters, filtered });
    // Size filter
    // if (filters?.sizes && filters?.sizes.length > 0) {
    //   filtered = filtered.filter((product: IProduct) => {
    //     return product?.sizes.some((si: string) => filters?.sizes?.includes(si))
    //   });
    // }

    // Price range filter
    if (filters.priceRange.min !== '' || filters.priceRange.max !== '') {
      filtered = filtered.filter((product: IProduct) => {
        const min = filters.priceRange.min === '' ? 0 : parseFloat(filters.priceRange.min);
        const max = filters.priceRange.max === '' ? Infinity : parseFloat(filters.priceRange.max);
        return Number(product.price.retail) >= min && Number(product.price.retail) <= max;
      });
    }

    // Category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter((product: IProduct) => {
        return product.category && (filters.categories.includes(product?.category) || filters.categories.includes(product?.subCategory || ""))
      });
    }

    // Rating filter
    // if (filters.ratings && filters.ratings.length > 0) {
    //   filtered = filtered.filter((product: IProduct) => {
    //     return product?.rating && filters?.ratings?.includes(product.rating.toString())
    //   });
    // }

    setFilteredProducts(filtered);

  }, [filters, products]);



  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };



  const clearAllFilters = () => {
    setFilters({
      // sizes: [],
      priceRange: { min: '', max: '' },
      categories: [],
      // ratings: []
    });
  };
  return (
    <div className='flex gap-5 relative'>
      <Filters filters={filters} onClearAll={clearAllFilters} onFilterChange={handleFilterChange} handleClose={handleCloseSidebar} isOpen={isOpen} />
      {
        isLoading ? "Loading..." : error ? error : <ProductList products={filteredProducts} />
      }
    </div>
  )
}