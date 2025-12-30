import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useSocket } from '../../hooks/useSocket';
import axios from 'axios';
import { ShoppingBag, FileText, Package, Clock } from 'lucide-react';

export const DashboardHome = () => {
    const { user } = useAuth();
    const socket = useSocket();
    const [stats, setStats] = useState({
        activeQuotes: 0,
        pendingOrders: 0,
        completedOrders: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            // Mock stats fetching - in real app would hit an endpoint
            // For now just showing static structure or simplified fetch
            try {
                // const res = await axios.get('/api/stats');
                // setStats(res.data);
            } catch (e) { }
        };
        fetchStats();

        // Listen for real-time updates
        if (socket) {
            socket.on('quote_update', (data) => {
                console.log('Realtime quote update:', data);
                // Refresh stats
            });
            socket.on('order_update', (data) => {
                console.log('Realtime order update:', data);
            });
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
                <StatCard title="Active Quotes" value="3" icon={FileText} color="bg-orange-500" />
                <StatCard title="Orders in Progress" value="1" icon={Clock} color="bg-blue-500" />
                <StatCard title="Completed Orders" value="12" icon={Package} color="bg-green-500" />
                <StatCard title="Services Browsed" value="8" icon={ShoppingBag} color="bg-purple-500" />
            </div>

            {/* Recent Activity or Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white shadow rounded-lg p-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Recent Notifications</h3>
                    <div className="border-l-4 border-blue-500 bg-blue-50 p-4 mb-4">
                        <div className="flex">
                            <div className="ml-3">
                                <p className="text-sm text-blue-700">
                                    Total '400kg Cotton' order moved to <span className="font-bold">Washing</span> stage.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="border-l-4 border-orange-500 bg-orange-50 p-4">
                        <div className="flex">
                            <div className="ml-3">
                                <p className="text-sm text-orange-700">
                                    New quote response received for 'Polyester Batch 2'.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white shadow rounded-lg p-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Quick Actions</h3>
                    <div className="space-y-4">
                        <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700">
                            Create New Quote Request
                        </button>
                        <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                            Browse Service Catalog
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
