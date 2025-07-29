import { User } from "lucide-react";

// Sample components for different tabs
export const Dashboard = () => (
    <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-2">Total Users</h3>
                <p className="text-3xl font-bold text-blue-600">1,234</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-2">Revenue</h3>
                <p className="text-3xl font-bold text-green-600">Rs. 12,345</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-2">Orders</h3>
                <p className="text-3xl font-bold text-purple-600">567</p>
            </div>
        </div>
    </div>
);

export const Profile = () => (
    <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Profile</h1>
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md">
            <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-gray-600" />
                </div>
                <div className="ml-4">
                    <h2 className="text-xl font-semibold">John Doe</h2>
                    <p className="text-gray-600">john@example.com</p>
                </div>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                Edit Profile
            </button>
        </div>
    </div>
);

export const Analytics = () => (
    <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Analytics</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Traffic Overview</h3>
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <span>Page Views</span>
                    <span className="font-semibold">25,430</span>
                </div>
                <div className="flex justify-between items-center">
                    <span>Unique Visitors</span>
                    <span className="font-semibold">8,920</span>
                </div>
                <div className="flex justify-between items-center">
                    <span>Bounce Rate</span>
                    <span className="font-semibold">34.5%</span>
                </div>
            </div>
        </div>
    </div>
);

export const SettingsPage = () => (
    <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Settings</h1>
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md">
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Notifications
                    </label>
                    <select className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option>All notifications</option>
                        <option>Important only</option>
                        <option>None</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Theme
                    </label>
                    <select className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option>Light</option>
                        <option>Dark</option>
                        <option>Auto</option>
                    </select>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                    Save Changes
                </button>
            </div>
        </div>
    </div>
);

