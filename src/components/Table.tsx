'use client';

import React from 'react';

type Column<T> = {
    header: string;
    accessor: keyof T | string;
    // eslint-disable-next-line
    cell?: (value: any, row: T) => React.ReactNode;
    // eslint-disable-next-line
    className?: (value: any, row: T) => string;
};

interface TableProps<T> {
    columns: Column<T>[];
    data: T[];
    onRowClick?: (row: T) => void;
}
// eslint-disable-next-line
function Table<T extends { [key: string]: any }>({
    columns,
    data,
    onRowClick,
}: TableProps<T>) {
    return (
        <div className="overflow-x-auto bg-white rounded shadow">
            <table className="min-w-full">
                <thead className="bg-gray-50">
                    <tr className="border-b">
                        {columns.map((col, index) => (
                            <th
                                key={index}
                                className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {data.map((row, rowIndex) => (
                        <tr
                            key={rowIndex}
                            className="hover:bg-gray-50 cursor-pointer"
                            onClick={() => onRowClick?.(row)}
                        >
                            {columns.map((col, colIndex) => {
                                const value = col.accessor.includes('.')
                                    ? col.accessor.split('.').reduce((obj, key) => obj?.[key], row)
                                    : row[col.accessor as keyof T];

                                return (
                                    <td
                                        key={colIndex}
                                        className={`py-3 px-4 whitespace-nowrap ${col.className ? col.className(value, row) : ''
                                            }`}
                                    >
                                        {col.cell ? col.cell(value, row) : value}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;
