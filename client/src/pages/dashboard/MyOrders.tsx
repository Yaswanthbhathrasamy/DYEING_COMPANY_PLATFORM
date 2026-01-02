import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useSocket } from '../../hooks/useSocket';
import { CheckCircle, Clock, Truck, Droplets, Sun, ClipboardCheck } from 'lucide-react';
import clsx from 'clsx';

interface TimelineEvent {
    status: string;
    timestamp: string;
    note: string;
}

interface Order {
    _id: string;
    quote: {
        items: { service: { name: string } }[]
    };
    status: string;
    timeline: TimelineEvent[];
    totalAmount?: number;
    billingDetails?: {
        companyName?: string;
    };
}

const statusSteps = [
    { value: 'pending', label: 'Queued', icon: Clock },
    { value: 'dyeing', label: 'Dyeing', icon: Droplets },
    { value: 'washing', label: 'Washing', icon: Droplets }, // Reuse icon or find better
    { value: 'drying', label: 'Drying', icon: Sun },
    { value: 'quality_check', label: 'QC', icon: ClipboardCheck },
    { value: 'dispatched', label: 'Dispatched', icon: Truck },
    { value: 'completed', label: 'Done', icon: CheckCircle },
];

export const MyOrders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const { user } = useAuth();
    const socket = useSocket();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/orders?userId=${user?.id}`);
                setOrders(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchOrders();

        if (socket) {
            socket.on('order_update', (data: { type: string, order: Order }) => {
                // Update or Add order
                if (data.type === 'NEW_ORDER') {
                    setOrders(prev => [data.order, ...prev]);
                } else {
                    setOrders(prev => prev.map(o => o._id === data.order._id ? data.order : o));
                }
            });
        }
    }, [user?.id, socket]);

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Track Orders</h1>

            {orders.map(order => (
                <div key={order._id} className="bg-white shadow rounded-lg p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Order #{order._id.slice(-6)}</h3>
                            <p className="text-sm text-gray-500">{order.quote?.items[0]?.service?.name}</p>
                        </div>
                        <div className="text-right">
                            {/* @ts-ignore */}
                            {order.totalAmount > 0 && (
                                <p className="text-lg font-bold text-green-600 mb-1">
                                    {/* @ts-ignore */}
                                    ₹{order.totalAmount.toLocaleString()}
                                </p>
                            )}
                            <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 text-gray-800 capitalize">
                                {order.status.replace('_', ' ')}
                            </span>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="relative mb-6">
                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                            {/* Calculate rough percent based on index */}
                            <div
                                style={{ width: `${(statusSteps.findIndex(s => s.value === order.status) + 1) / statusSteps.length * 100}%` }}
                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-500 transition-all duration-1000 ease-in-out"
                            ></div>
                        </div>
                        <div className="flex justify-between text-xs sm:text-sm">
                            {statusSteps.map((step, idx) => {
                                const currentStepIdx = statusSteps.findIndex(s => s.value === order.status);
                                const isCompleted = idx <= currentStepIdx;
                                const isCurrent = idx === currentStepIdx;
                                const Icon = step.icon;

                                return (
                                    <div key={step.value} className={clsx("flex flex-col items-center", isCompleted ? "text-primary-600" : "text-gray-400")}>
                                        <div className={clsx("p-1 rounded-full mb-1", isCurrent ? "bg-primary-100 ring-4 ring-primary-50" : "")}>
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <span className="hidden sm:inline">{step.label}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Invoice & Details Link */}
                    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                        <div className="text-sm text-gray-500">
                            {/* @ts-ignore */}
                            {order.billingDetails?.companyName && (
                                <span>Billed to: <span className="font-medium text-gray-900">{order.billingDetails.companyName}</span></span>
                            )}
                        </div>
                        <button className="text-primary-600 hover:text-primary-800 text-sm font-medium flex items-center">
                            View Invoice & Details
                        </button>
                    </div>
                </div>
            ))}
            {orders.length === 0 && <div className="text-center text-gray-500 py-10">No active orders.</div>}
        </div>
    );
};
