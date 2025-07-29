import { IDType, NavItem, NavItems } from '@/types/navItem';
import { X } from 'lucide-react';
import React, { Dispatch, SetStateAction } from 'react'

interface SidebarProps {
    sidebarOpen: boolean,
    onClose: () => void,
    activeTab: IDType,
    navItems: NavItems,
    setActiveTab: Dispatch<SetStateAction<IDType>>,
}

const Sidebar = ({ sidebarOpen, onClose, navItems, activeTab, setActiveTab }: SidebarProps) => {
    return (
        <>
            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="sm:static fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
                {/* Sidebar header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-xl font-bold text-gray-800">MyApp</h2>
                    <button
                        onClick={onClose}
                        className="lg:hidden p-1 rounded-md hover:bg-gray-100"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="p-4">
                    <ul className="space-y-2">
                        {navItems.map((item: NavItem) => {
                            const Icon = item.icon;
                            return (
                                <li key={item.id}>
                                    <button
                                        onClick={() => {
                                            setActiveTab(item.id);
                                            onClose() // Close sidebar on mobile after selection
                                        }}
                                        className={`
                      w-full flex items-center px-3 py-2 rounded-md text-left transition-colors
                      ${activeTab === item.id
                                                ? 'bg-blue-100 text-blue-700 font-medium'
                                                : 'text-gray-700 hover:bg-gray-100'
                                            }
                    `}
                                    >
                                        <Icon className="w-5 h-5 mr-3" />
                                        {item.label}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default Sidebar