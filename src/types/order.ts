export interface IOrderItem {
    product: string; // ObjectId as string
    productSnapshot: {
        title: string;
        price: string;
        coverImage?: string;
        category?: string;
        subCategory?: string;
    };
    quantity: number;
    color?: string;
    size?: "XS" | "S" | "M" | "L" | "XL" | "XXL";
    unitPrice: number;
    totalPrice: number;
}

export interface IAddress {
    email: string;
    mobileNumber: string;
    firstName: string;
    lastName: string;
    country: string;
    state: string;
    address: string;
    postalCode: string;
    city: string;
}

export type OrderStatus =
    | "PENDING"
    | "CONFIRMED"
    | "PROCESSING"
    | "SHIPPED"
    | "DELIVERED"
    | "CANCELLED"
    | "REFUNDED";

export type PaymentStatus =
    | "PENDING"
    | "PAID"
    | "FAILED"
    | "REFUNDED"
    | "PARTIALLY_REFUNDED";

export type PaymentMethod =
    | "CREDIT_CARD"
    | "DEBIT_CARD"
    | "PAYPAL"
    | "BANK_TRANSFER"
    | "CASH_ON_DELIVERY";

export interface IOrder {
    _id: string;
    orderNumber: string;
    customerEmail: string;
    items: IOrderItem[];
    shippingAddress: IAddress;
    billingAddress: IAddress;
    subtotal: number;
    shippingCost: number;
    tax: number;
    discount: number;
    totalAmount: number;
    status: OrderStatus;
    paymentStatus: PaymentStatus;
    paymentMethod: PaymentMethod;
    paymentId?: string;
    trackingNumber?: string;
    estimatedDelivery?: string; // or Date if you prefer
    deliveredAt?: string;
    cancelledAt?: string;
    cancelReason?: string;
    notes?: string;
    createdAt?: string;
    updatedAt?: string;
}
