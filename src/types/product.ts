export interface IProduct {
  _id: string;
  title: string;
  subTitle?: string;
  description: string;
  price: {
    retail: number,
    display: number, 
  };
  images: string[]; // Assuming array of image URLs
  coverImage: string;
  category?: string;
  subCategory?: string;
  gender?: "MALE" | "FEMALE" | "KIDS" | "UNISEX";
  sizes: Array<"XS" | "S" | "M" | "L" | "XL" | "XXL">;
  stock: number;
  sales: number;
  rating: number;
  variants: Array<{
    color: string;
    model?: string; // Optional model field
    stock: number;
    images?: string[]; // Optional: different images per variant
  }>;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICartItem {
  product: IProduct;
  variantIndex: number;
  quantity: number;
  color?: string;
  size?: "XS" | "S" | "M" | "L" | "XL" | "XXL";
}  