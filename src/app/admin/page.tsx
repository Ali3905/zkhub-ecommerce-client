"use client"
import { useState } from 'react';
import { Menu, Home, User, Settings } from 'lucide-react';
import {  Dashboard, SettingsPage } from './components';
import Orders from './orders'
import Sidebar from './Sidebar';
import { IDType, NavItems } from '@/types/navItem';
import Products from './Products';



// Navigation items configuration
const navItems: NavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, component: Dashboard },
    { id: 'products', label: 'Products', icon: User, component: Products },
    { id: 'orders', label: 'Orders', icon: User, component: Orders },
    // { id: 'analytics', label: 'Analytics', icon: BarChart, component: Analytics },
    { id: 'settings', label: 'Settings', icon: Settings, component: SettingsPage },
];

export default function Layout() {
    const [activeTab, setActiveTab] = useState<IDType>('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

    const ActiveComponent = navItems.find(item => item.id === activeTab)?.component || Dashboard;

    const onClose = () => {
        setSidebarOpen(false)
    }

    return (
        <div className="flex h-screen bg-gray-100">

            <Sidebar activeTab={activeTab} navItems={navItems} onClose={onClose} setActiveTab={setActiveTab} sidebarOpen={sidebarOpen} />
            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top bar */}
                <header className="bg-white shadow-sm border-b px-4 py-3">
                    <div className="flex items-center">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-2 rounded-md hover:bg-gray-100 mr-2"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                        <h1 className="text-lg font-semibold text-gray-800">
                            {navItems.find(item => item.id === activeTab)?.label}
                        </h1>
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 overflow-auto">
                    <ActiveComponent />
                </main>
            </div>
        </div>
    );
}