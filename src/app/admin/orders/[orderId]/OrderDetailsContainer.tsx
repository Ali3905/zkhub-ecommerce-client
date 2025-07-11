'use client';

import React from 'react';
import { IOrder } from '@/types/order';
import { formatDate } from '@/utils/date';

interface OrderDetailsProps {
    order: IOrder;
}

const InfoRow = ({ label, value }: { label: string; value: string | number | React.ReactNode }) => (
    <div className="flex justify-between py-1 border-b last:border-none">
        <span className="font-medium text-gray-700">{label}</span>
        <span className="text-gray-900">{value}</span>
    </div>
);

const AddressCard = ({ title, address }: { title: string; address: IOrder['shippingAddress'] }) => (
    <div className="w-full md:w-1/2 p-4 border rounded-md shadow-sm bg-white">
        <h3 className="font-semibold mb-2 text-lg">{title}</h3>
        <p>{address.firstName} {address.lastName}</p>
        <p>{address.email}</p>
        <p>{address.mobileNumber}</p>
        <p>{address.address}, {address.city}, {address.state}, {address.postalCode}</p>
        <p>{address.country}</p>
    </div>
);

const OrderItemCard = ({ item }: { item: IOrder['items'][0] }) => (
    <div className="p-4 border rounded-md bg-gray-50 flex gap-4 items-start">
        {item.productSnapshot.coverImage && (
            <img src={item.productSnapshot.coverImage} alt={item.productSnapshot.title} className="w-16 h-16 object-cover rounded" />
        )}
        <div className="flex-grow">
            <h4 className="font-semibold">{item.productSnapshot.title}</h4>
            <p className="text-sm text-gray-600">Category: {item.productSnapshot.category} / {item.productSnapshot.subCategory}</p>
            <p className="text-sm text-gray-600">Size: {item.size ?? 'N/A'}, Color: {item.color ?? 'N/A'}</p>
            <p className="text-sm">Quantity: {item.quantity} × Rs. {item.unitPrice}</p>
            <p className="font-semibold">Total: Rs. {item.totalPrice}</p>
        </div>
    </div>
);

const StatusBadge = ({ value, type }: { value: string; type: 'status' | 'payment' }) => {
    const baseClass = 'px-2 py-1 rounded-full text-xs font-semibold capitalize';
    const statusMap: Record<string, string> = {
        PENDING: 'bg-yellow-100 text-yellow-800',
        CONFIRMED: 'bg-blue-100 text-blue-800',
        PROCESSING: 'bg-purple-100 text-purple-800',
        SHIPPED: 'bg-indigo-100 text-indigo-800',
        DELIVERED: 'bg-green-100 text-green-800',
        CANCELLED: 'bg-red-100 text-red-800',
        REFUNDED: 'bg-gray-100 text-gray-800',
        PAID: 'bg-green-100 text-green-800',
        FAILED: 'bg-red-100 text-red-800',
        PARTIALLY_REFUNDED: 'bg-orange-100 text-orange-800'
    };

    return (
        <span className={`${baseClass} ${statusMap[value] ?? 'bg-gray-100 text-gray-800'}`}>
            {value.replaceAll('_', ' ')}
        </span>
    );
};

const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
    return (
        <div className="space-y-8 max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-2">Order Details</h2>

            {/* Summary Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoRow label="Order ID" value={order._id} />
                <InfoRow label="Order Number" value={order.orderNumber} />
                <InfoRow label="Customer Email" value={order.customerEmail} />
                <InfoRow label="Created At" value={formatDate(new Date(order.createdAt ?? ''))} />
                <InfoRow label="Status" value={<StatusBadge value={order.status} type="status" />} />
                <InfoRow label="Payment Status" value={<StatusBadge value={order.paymentStatus} type="payment" />} />
                <InfoRow label="Payment Method" value={order.paymentMethod} />
                {order.trackingNumber && <InfoRow label="Tracking Number" value={order.trackingNumber} />}
                {order.estimatedDelivery && <InfoRow label="Estimated Delivery" value={formatDate(new Date(order.estimatedDelivery))} />}
            </div>

            {/* Addresses */}
            <div className="flex flex-col md:flex-row gap-4">
                <AddressCard title="Shipping Address" address={order.shippingAddress} />
                <AddressCard title="Billing Address" address={order.billingAddress} />
            </div>

            {/* Items */}
            <div className="space-y-4">
                <h3 className="text-xl font-semibold">Items</h3>
                {order.items.map((item, idx) => (
                    <OrderItemCard key={idx} item={item} />
                ))}
            </div>

            {/* Price Summary */}
            <div className="border-t pt-4">
                <InfoRow label="Subtotal" value={`Rs. ${order.subtotal}`} />
                <InfoRow label="Shipping Cost" value={`Rs. ${order.shippingCost}`} />
                <InfoRow label="Tax" value={`Rs. ${order.tax}`} />
                <InfoRow label="Discount" value={`Rs. ${order.discount}`} />
                <InfoRow label="Total Amount" value={<span className="font-bold text-lg text-black">Rs. {order.totalAmount}</span>} />
            </div>

            {/* Notes / Cancel Reason */}
            {order.notes && <p className="text-sm text-gray-700">📝 Notes: {order.notes}</p>}
            {order.cancelReason && <p className="text-sm text-red-600">❌ Cancel Reason: {order.cancelReason}</p>}
        </div>
    );
};

export default OrderDetails;
