import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useSocket } from '../../hooks/useSocket';
import { BadgeCheck, Clock, CheckCircle, XCircle } from 'lucide-react';

interface Quote {
    _id: string;
    items: { service: { name: string }, quantity: number }[];
    status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
    adminResponse?: { price: number, notes: string };
    createdAt: string;
}

export const MyQuotes = () => {
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const { user } = useAuth();
    const socket = useSocket();

    useEffect(() => {
        const fetchQuotes = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/quotes?userId=${user?.id}`);
                setQuotes(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchQuotes();

        if (socket) {
            socket.on('quote_update', (data: { quote: Quote }) => {
                // Update specific quote in list
                setQuotes(prev => prev.map(q => q._id === data.quote._id ? data.quote : q));
            });
        }
    }, [user?.id, socket]);

    const handleAction = async (id: string, status: 'accepted' | 'rejected') => {
        try {
            await axios.put(`http://localhost:5000/api/quotes/${id}/status`, { status });
            // Optimistic update
            setQuotes(prev => prev.map(q => q._id === id ? { ...q, status } : q));
        } catch (err) {
            console.error(err);
        }
    };

    const StatusBadge = ({ status }: { status: string }) => {
        const styles = {
            pending: 'bg-yellow-100 text-yellow-800',
            reviewed: 'bg-blue-100 text-blue-800',
            accepted: 'bg-green-100 text-green-800',
            rejected: 'bg-red-100 text-red-800'
        };
        return (
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${styles[status as keyof typeof styles]}`}>
                {status.toUpperCase()}
            </span>
        );
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">My Quotations</h1>

            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                    {quotes.map((quote) => (
                        <li key={quote._id}>
                            <div className="px-4 py-4 sm:px-6">
                                <div className="flex items-center justify-between">
                                    <div className="text-sm font-medium text-primary-600 truncate">
                                        Quote #{quote._id.slice(-6)}
                                    </div>
                                    <div className="ml-2 flex-shrink-0 flex">
                                        <StatusBadge status={quote.status} />
                                    </div>
                                </div>
                                <div className="mt-2 text-sm text-gray-500">
                                    <p>{quote.items.length} items (e.g. {quote.items[0]?.service?.name})</p>
                                    <p>Requested on {new Date(quote.createdAt).toLocaleDateString()}</p>
                                </div>

                                {quote.status === 'reviewed' && quote.adminResponse && (
                                    <div className="mt-4 bg-blue-50 p-4 rounded-md border border-blue-100">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-semibold text-blue-900">Quote Received: ₹{quote.adminResponse.price}</span>
                                            <div className="space-x-2">
                                                <button
                                                    onClick={() => handleAction(quote._id, 'accepted')}
                                                    className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-white bg-green-600 hover:bg-green-700"
                                                >
                                                    Accept
                                                </button>
                                                <button
                                                    onClick={() => handleAction(quote._id, 'rejected')}
                                                    className="inline-flex items-center px-3 py-1 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        </div>
                                        <p className="text-xs text-blue-700">Note: {quote.adminResponse.notes}</p>
                                    </div>
                                )}
                            </div>
                        </li>
                    ))}
                    {quotes.length === 0 && <div className="p-4 text-center text-gray-500">No quotes found.</div>}
                </ul>
            </div>
        </div>
    );
};
