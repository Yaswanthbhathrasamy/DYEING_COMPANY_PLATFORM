import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useSocket } from '../../hooks/useSocket';
import axios from 'axios';
import { ShoppingBag, FileText, Package, Clock } from 'lucide-react';

import { useNavigate } from 'react-router-dom';

export const DashboardHome = () => {
    const { user } = useAuth();
    const socket = useSocket();
    const navigate = useNavigate();


    const [stats, setStats] = useState({
        activeQuotes: 0,
        ordersInProgress: 0,
        completedOrders: 0,
        serviceCount: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/stats');
                setStats(res.data);
            } catch (e) {
                console.error("Failed to fetch stats", e);
            }
        };
        fetchStats();

        // Listen for real-time updates
        if (socket) {
            socket.on('quote_update', () => fetchStats());
            socket.on('order_update', () => fetchStats());
        }
    }, [socket]);

    const StatCard = ({ title, value, icon: Icon, color }: any) => (
        <div className="bg-white overflow-hidden shadow rounded-lg p-5">
            <div className="flex items-center">
                <div className={`flex-shrink-0 p-3 rounded-md ${color}`}>
                    <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                    <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
                        <dd className="text-2xl font-semibold text-gray-900">{value}</dd>
                    </dl>
                </div>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Welcome, {user?.name}</h1>
                <p className="text-gray-500">Here's what's happening with your dyeing projects today.</p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Active Quotes" value={stats.activeQuotes} icon={FileText} color="bg-orange-500" />
                <StatCard title="Orders in Progress" value={stats.ordersInProgress} icon={Clock} color="bg-blue-500" />
                <StatCard title="Completed Orders" value={stats.completedOrders} icon={Package} color="bg-green-500" />
                <StatCard title="Available Services" value={stats.serviceCount} icon={ShoppingBag} color="bg-purple-500" />
            </div>

            {/* Recent Activity or Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white shadow rounded-lg p-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Recent Notifications</h3>
                    <div className="border-l-4 border-blue-500 bg-blue-50 p-4 mb-4">
                        <div className="flex">
                            <div className="ml-3">
                                <p className="text-sm text-blue-700">
                                    System <span className="font-bold">Operational</span>. Real-time updates enabled.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white shadow rounded-lg p-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Quick Actions</h3>
                    <div className="space-y-4">
                        <button
                            onClick={() => navigate('/dashboard/catalog')}
                            className="w-full flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                        >
                            Create New Quote Request
                        </button>
                        <button
                            onClick={() => navigate('/dashboard/catalog')}
                            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                            Browse Service Catalog
                        </button>
                        <button
                            onClick={() => navigate('/dashboard/cart')}
                            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                            View Quote Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
