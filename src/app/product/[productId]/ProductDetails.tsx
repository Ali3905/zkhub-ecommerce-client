"use client";
import useProduct from "@/Hooks/useProduct";
import { ICartItem, IProduct } from "@/types/product";
import Image from "next/image";
import React, { useState } from "react";

const ProductDetails = ({ id }: { id: number }) => {
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState<number | null>(null);
  const { data: product, isLoading, error } = useProduct({ id });

  const addToCart = (product: IProduct, quantity: number = 1) => {
    if (selectedVariantIndex === null) {
      alert("Please select a variant before adding to cart");
      return;
    }

    const selectedVariant = product.variants[selectedVariantIndex];
    if (selectedVariant.stock <= 0) {
      alert("This variant is out of stock");
      return;
    }

    alert("Product added in cart");

    const cart: ICartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");

    const existingItem = cart.find(
      (item: ICartItem) =>
        item.product._id === product._id &&
        item.variantIndex === selectedVariantIndex
    );

    if (!existingItem) {
      cart.push({ product, quantity, variantIndex: selectedVariantIndex });
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };

  return product ? (
    <div className="max-w-[1200px] mx-auto mt-[100px] flex justify-center gap-10">
      {/* Left Image Section */}
      <div className="flex gap-5">
        <Image
          width={360}
          height={440}
          alt={product.title}
          src={product.images[activeImageIndex] || "https://shorturl.at/NxD5e"}
        />
        <div className="flex flex-col gap-2">
          {product.images.map((img, i) => (
            <Image
              key={i}
              src={img}
              alt={product.title}
              width={60}
              height={75}
              className={`cursor-pointer ${
                activeImageIndex === i ? "" : "opacity-50"
              }`}
              onClick={() => setActiveImageIndex(i)}
            />
          ))}
        </div>
      </div>

      {/* Right Product Info Section */}
      <div className="border rounded-lg px-[30px] py-[20px] flex flex-col">
        <p className="font-semibold">{product.title}</p>
        <span className="flex flex-col font-semibold mb-4">
          <p className="text-red-400 line-through">${product.price.display}</p>
          <p>${product.price.retail}</p>
        </span>
        <p>MRP incl. of all taxes</p>
        <p className="font-semibold my-5">{product.description}</p>

        {/* Variant Selection */}
        {product.variants?.length > 0 && (
          <div className="mb-4">
            <p className="font-semibold mb-2">Select Variant</p>
            <div className="flex flex-col gap-2">
              {product.variants.map((variant, index) => {
                const isSelected = selectedVariantIndex === index;
                const isOutOfStock = variant.stock <= 0;

                return (
                  <div
                    key={index}
                    className={`flex items-center gap-2 p-2 border rounded cursor-pointer transition-all duration-150 ${
                      isSelected ? "border-black ring-1 ring-black" : "border-gray-300"
                    } ${isOutOfStock ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={() => {
                      if (!isOutOfStock) setSelectedVariantIndex(index);
                    }}
                  >
                    <div
                      className="w-[20px] h-[20px] border rounded"
                      style={{ backgroundColor: variant.dialColor }}
                      title={`Dial: ${variant.dialColor}`}
                    />
                    <div
                      className="w-[20px] h-[20px] border rounded"
                      style={{ backgroundColor: variant.strapColor }}
                      title={`Strap: ${variant.strapColor}`}
                    />
                    {/* <span className="text-sm">
                      | Stock: {variant.stock}
                    </span> */}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Size Selection */}
        {product.sizes?.length > 0 && (
          <div>
            <p className="font-semibold mb-2">Size</p>
            <ul className="flex gap-2">
              {product.sizes.map((si, i) => (
                <li
                  key={i}
                  className="w-[50px] text-center cursor-pointer border px-4 py-2"
                >
                  {si}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Add to Cart */}
        <button
          className="bg-gray-500 w-full py-2 mt-auto text-white font-semibold cursor-pointer"
          onClick={() => addToCart(product, 1)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  ) : isLoading ? (
    <p>Loading...</p>
  ) : error ? (
    <p>{error}</p>
  ) : (
    ""
  );
};

export default ProductDetails;
