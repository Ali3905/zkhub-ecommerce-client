import { IProduct } from '@/types/product';
import Table from '@/components/Table';
import { formatDate } from '@/utils/date';
import { useRouter } from 'next/navigation';


const ProductTable = ({ products }: { products: IProduct[] }) => {
    const router = useRouter();

    const columns = [
        {
            header: 'Title',
            accessor: 'title',
        },
        {
            header: 'Retail Price',
            accessor: 'price.retail',
            cell: (value: string) => `$${value}`,
        },
        {
            header: 'Gender',
            accessor: 'gender',
            cell: (value: string) => <span className="capitalize">{value}</span>,
        },
        {
            header: 'Category',
            accessor: 'category',
        },
        {
            header: 'Sub Category',
            accessor: 'subCategory',
        },
        {
            header: 'Variants | Stock',
            accessor: 'variants',
            cell: (value: { dialColor: string; strapColor: string; stock: number }[]) => (
                <div className="flex flex-col gap-2 flex-wrap">
                    {value.map((variant, i) => (
                        <div key={i} className="flex items-center gap-1">
                            <div
                                style={{ backgroundColor: variant.dialColor }}
                                className="w-[20px] h-[20px] border rounded"
                            ></div> +
                            <div
                                style={{ backgroundColor: variant.strapColor }}
                                className="w-[20px] h-[20px] border rounded"
                            ></div>
                            <span className="text-xs">| {variant.stock}</span>
                        </div>
                    ))}
                </div>
            ),
        },
        // {
        //     header: 'Stock',
        //     accessor: 'stock',
        // },
        {
            header: 'Sales',
            accessor: 'sales',
        },
        {
            header: 'Created',
            accessor: 'createdAt',
            cell: (value: string) => formatDate(new Date(value)),
        },
        {
            header: 'Actions',
            accessor: '_id',
            cell: (_value: string, row: Product) => (
                <div className="flex gap-2">
                    <button
                        className="text-blue-600 hover:underline"
                        onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/admin/products/${row._id}/edit`);
                        }}
                    >
                        Edit
                    </button>
                    <button
                        className="text-red-600 hover:underline"
                        onClick={(e) => {
                            e.stopPropagation();
                            alert(`Delete product: ${row.title}`);
                            // or call delete API
                        }}
                    >
                        Delete
                    </button>
                </div>
            ),
        },
    ];

    return (
        <Table<IProduct>
            data={products}
            columns={columns}
            onRowClick={(row) => router.push(`/admin/products/${row._id}`)}
        />
    );
};

export default ProductTable;
