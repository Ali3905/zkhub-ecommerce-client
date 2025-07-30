"use client";

import useProduct from "@/Hooks/useProduct";
import { ICartItem, IProduct } from "@/types/product";
import Image from "next/image";
import React, { useState } from "react";

const ProductImages = ({
  product,
  activeImageIndex,
  setActiveImageIndex,
}: {
  product: IProduct;
  activeImageIndex: number | null;
  setActiveImageIndex: (index: number) => void;
}) => (
  <div className="flex flex-col sm:flex-row items-center gap-5">
    <Image
      width={360}
      height={440}
      alt={product.title}
      src={
        activeImageIndex === null
          ? product.coverImage
          : product.images[activeImageIndex]
      }
      className="aspect-[9/11]"
    />
    <div className="flex flex-row sm:flex-col gap-2">
      {product.images.map((img, i) => (
        <Image
          key={i}
          src={img}
          alt={product.title}
          width={60}
          height={115}
          className={`cursor-pointer aspect-[9/10] ${activeImageIndex === i ? "" : "opacity-50"
            }`}
          onClick={() => setActiveImageIndex(i)}
        />
      ))}
    </div>
  </div>
);

const VariantSelector = ({
  product,
  // selectedVariantIndex,
  setSelectedVariantIndex,
}: {
  product: IProduct;
  selectedVariantIndex: number | null;
  setSelectedVariantIndex: (index: number) => void;
}) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  const allVariants = product.variants;

  // Models filtered based on color (if selected)
  const models = Array.from(
    new Set(
      allVariants
        .filter(v => (selectedColor ? v.color === selectedColor : true))
        .map(v => v.model)
        .filter(Boolean) as string[]
    )
  );

  // Colors filtered based on model (if selected)
  const colors = Array.from(
    new Set(
      allVariants
        .filter(v => (selectedModel ? v.model === selectedModel : true))
        .map(v => v.color)
    )
  );

  // Automatically select variant if no model exists
  const autoSelectVariant = (color: string) => {
    const matchingVariants = allVariants.filter(
      v => v.color === color && !v.model
    );
    if (matchingVariants.length > 0) {
      const variant = matchingVariants[0];
      if (variant.stock > 0) {
        const index = allVariants.indexOf(variant);
        setSelectedVariantIndex(index);
      } else {
        setSelectedVariantIndex(null);
      }
    }
  };

  // Get variant index helper
  const getVariantIndex = (color: string, model?: string | null) =>
    allVariants.findIndex(
      v =>
        v.color === color &&
        (v.model === model || (!v.model && !model)) // handle model-less variants
    );

  return (
    <div className="mb-4 flex flex-col gap-3">
      {/* Model Selector */}
      {models.length > 0 && (
        <div>
          <p className="font-semibold mb-2">Select Model</p>
          <div className="flex gap-2 flex-wrap">
            {models.map((model, i) => {
              const anyInStock = allVariants.some(
                v => v.model === model && v.stock > 0
              );
              const isSelected = selectedModel === model;

              return (
                <button
                  key={i}
                  disabled={!anyInStock}
                  onClick={() => {
                    setSelectedModel(model);
                    setSelectedColor(null);
                    setSelectedVariantIndex(null);
                  }}
                  className={`px-4 py-1 rounded border text-sm ${isSelected ? "bg-black text-white" : "bg-white text-black"
                    } ${!anyInStock ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                >
                  {model}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Color Selector */}
      <div>
        <p className="font-semibold mb-2">Select Color</p>
        <div className="flex gap-2 flex-wrap">
          {colors.map((color, i) => {
            const variant = allVariants.find(
              v =>
                v.color === color &&
                (selectedModel ? v.model === selectedModel : true)
            );
            const isOutOfStock = variant?.stock === 0;
            const isSelected = selectedColor === color;

            return (
              <button
                key={i}
                disabled={!variant || isOutOfStock}
                onClick={() => {
                  if (selectedColor === color) { setSelectedColor(null) } else { setSelectedColor(color) }
                  
                  if (variant && !variant.model) {
                    autoSelectVariant(color);
                  } else if (selectedModel && variant) {
                    const index = getVariantIndex(color, selectedModel);
                    setSelectedVariantIndex(index);
                  } else {
                    setSelectedVariantIndex(null);
                  }
                }}
                className={`px-4 py-1 rounded border text-sm ${isSelected ? "bg-black text-white" : "bg-white text-black"
                  } ${!variant || isOutOfStock ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
              >
                {color}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};



const SizeSelector = ({ sizes }: { sizes: string[] }) =>
  sizes?.length > 0 ? (
    <div>
      <p className="font-semibold mb-2">Size</p>
      <ul className="flex gap-2">
        {sizes.map((si, i) => (
          <li
            key={i}
            className="w-[50px] text-center cursor-pointer border px-4 py-2"
          >
            {si}
          </li>
        ))}
      </ul>
    </div>
  ) : null;

const ProductInfo = ({
  product,
  selectedVariantIndex,
  setSelectedVariantIndex,
  addToCart,
}: {
  product: IProduct;
  selectedVariantIndex: number | null;
  setSelectedVariantIndex: (index: number) => void;
  addToCart: (product: IProduct, quantity?: number) => void;
}) => (
  <div className="sm:border rounded-lg px-[30px] py-[20px] flex flex-col basis-[30%]">
    <p className="font-semibold">{product.title}</p>
    <p>{product.subTitle}</p>
    <div className="flex sm:flex-col flex-row-reverse justify-between items-center">
      <span className="flex flex-col font-semibold mb-4">
        <p className="text-red-400 line-through">Rs. {product.price.display}</p>
        <p>Rs. {product.price.retail}</p>
      </span>
      <p>MRP incl. of all taxes</p>
    </div>
    <p className="font-semibold my-5">{product.description}</p>

    <VariantSelector
      product={product}
      selectedVariantIndex={selectedVariantIndex}
      setSelectedVariantIndex={setSelectedVariantIndex}
    />

    <SizeSelector sizes={product.sizes || []} />

    <button
      className="bg-gray-500 w-full py-2 mt-auto text-white font-semibold cursor-pointer"
      onClick={() => addToCart(product, 1)}
    >
      Add to Cart
    </button>
  </div>
);

const ProductDetails = ({ id }: { id: number }) => {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
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
    <div className="sm:max-w-[1200px] min-h-[55vh] mx-auto mt-[100px] flex flex-col px-[10px] sm:px-0 sm:flex-row justify-center gap-10">
      <ProductImages
        product={product}
        activeImageIndex={activeImageIndex}
        setActiveImageIndex={setActiveImageIndex}
      />
      <ProductInfo
        product={product}
        selectedVariantIndex={selectedVariantIndex}
        setSelectedVariantIndex={setSelectedVariantIndex}
        addToCart={addToCart}
      />
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
