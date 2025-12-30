import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';
import { useSocket } from '../../../hooks/useSocket';

interface Order {
    _id: string;
    buyer: { name: string, companyName: string };
    quote: { items: { service: { name: string } }[] };
    status: string;
    createdAt: string;
}

export const OrderOps = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const { user } = useAuth();
    const socket = useSocket();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/orders?role=admin');
                setOrders(res.data);
            } catch (err) { console.error(err); }
        };
        fetchOrders();
    }, []);

    const handleUpdateStatus = async (id: string, newStatus: string) => {
        try {
            await axios.put(`http://localhost:5000/api/orders/${id}/status`, {
                status: newStatus,
                note: `Status updated to ${newStatus} by Admin`
            });
            alert('Status Updated');
            // Optimistic update
            setOrders(prev => prev.map(o => o._id === id ? { ...o, status: newStatus } : o));
        } catch (err) {
            console.error(err);
        }
    };

    const statuses = ['pending', 'dyeing', 'washing', 'drying', 'quality_check', 'dispatched', 'completed'];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Operations Control Center</h1>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{order._id.slice(-6)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.buyer?.companyName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.quote?.items[0]?.service?.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <select
                                        value={order.status}
                                        onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
                                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                    >
                                        {statuses.map(s => (
                                            <option key={s} value={s}>{s.replace('_', ' ').toUpperCase()}</option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
