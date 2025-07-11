import Table from '@/components/Table';
import { IOrder } from '@/types/order';
import { formatDate } from '@/utils/date';
import { useRouter } from 'next/navigation';

const OrderTable = ({ orders }: { orders: IOrder[] }) => {
    const router = useRouter();

    const getBadgeClass = (value: string, type: 'status' | 'payment') => {
        const baseClass = "px-2 py-1 rounded-full text-xs font-semibold capitalize";
        const statusMap = {
            PENDING: "bg-yellow-100 text-yellow-800",
            CONFIRMED: "bg-blue-100 text-blue-800",
            PROCESSING: "bg-purple-100 text-purple-800",
            SHIPPED: "bg-indigo-100 text-indigo-800",
            DELIVERED: "bg-green-100 text-green-800",
            CANCELLED: "bg-red-100 text-red-800",
            REFUNDED: "bg-gray-100 text-gray-800",
        };
        const paymentMap = {
            PENDING: "bg-yellow-100 text-yellow-800",
            PAID: "bg-green-100 text-green-800",
            FAILED: "bg-red-100 text-red-800",
            REFUNDED: "bg-gray-100 text-gray-800",
            PARTIALLY_REFUNDED: "bg-orange-100 text-orange-800",
        };

        const map = type === 'status' ? statusMap : paymentMap;
        return `${baseClass} ${map[value] || "bg-gray-100 text-gray-800"}`;
    };

    const columns = [
        { header: 'Order ID', accessor: 'orderNumber' },
        { header: 'Email', accessor: 'customerEmail' },
        { header: 'Items', accessor: 'items.length' },
        { header: 'Total', accessor: 'totalAmount' },
        {
            header: 'Date',
            accessor: 'createdAt',
            cell: (value: string) => formatDate(new Date(value)),
        },
        {
            header: 'Status',
            accessor: 'status',
            className: (value: string) => getBadgeClass(value, 'status'),
            cell: (value: string) => <span>{value}</span>,
        },
        {
            header: 'Payment',
            accessor: 'paymentStatus',
            className: (value: string) => getBadgeClass(value, 'payment'),
            cell: (value: string) => <span>{value}</span>,
        },
        {
            header: 'Actions',
            accessor: 'status',
            cell: (value: string, row: IOrder) => (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        alert(`Marking ${row._id} as shipped`);
                    }}
                    disabled={row.status === 'SHIPPED'}
                    className="text-blue-500 hover:text-blue-700"
                >
                    {row.status === 'PENDING' ? 'Mark as Shipped' : 'Shipped'}
                </button>
            ),
        },
    ];

    return (
        <Table<IOrder>
            data={orders}
            columns={columns}
            onRowClick={(row) => router.push(`/admin/orders/${row._id}`)}
        />
    );
};

export default OrderTable;
