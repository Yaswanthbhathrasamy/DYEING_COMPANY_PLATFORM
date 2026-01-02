import { useEffect, useState } from 'react';
import axios from 'axios';

import { useSocket } from '../../../hooks/useSocket';

interface Quote {
    _id: string;
    buyer: { _id: string, name: string, companyName: string };
    items: { service: { name: string }, quantity: number, notes: string }[];
    status: string;
    createdAt: string;
}

export const QuoteManager = () => {
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const socket = useSocket();
    const [responseForm, setResponseForm] = useState<{ id: string, price: number, notes: string } | null>(null);

    useEffect(() => {
        const fetchQuotes = async () => {
            // Admin view
            try {
                const res = await axios.get('http://localhost:5000/api/quotes');
                setQuotes(res.data);
            } catch (err) { console.error(err); }
        };
        fetchQuotes();

        if (socket) {
            socket.on('quote_update', (data: { type: string, quote: Quote }) => {
                // New quote or status update
                if (data.type === 'NEW_QUOTE') {
                    // We might need to fetch full details or handle populate if backend sends simple obj
                    // For now, simpler to just refetch or rely on simple internal data
                    setQuotes(prev => [data.quote, ...prev]);
                } else {
                    setQuotes(prev => prev.map(q => q._id === data.quote._id ? data.quote : q));
                }
            });
        }
    }, [socket]);

    const handleSendResponse = async () => {
        if (!responseForm) return;
        try {
            await axios.put(`http://localhost:5000/api/quotes/${responseForm.id}/respond`, {
                price: responseForm.price,
                notes: responseForm.notes
            });
            setResponseForm(null);
            // Optimistic update
            setQuotes(prev => prev.map(q => q._id === responseForm.id ? { ...q, status: 'reviewed' } : q));
        } catch (err) {
            console.error(err);
        }
    };

    const handleConvertToOrder = async (quote: Quote) => {
        if (!confirm('Convert this quote to a Live Order?')) return;
        try {
            await axios.post('http://localhost:5000/api/orders', {
                quoteId: quote._id,
                buyerId: quote.buyer._id // Populate might return object, make sure to access id
            });
            alert('Order Created!');
        } catch (err) {
            console.error(err);
            alert('Error creating order');
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Manage Quote Requests</h1>

            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                    {quotes.map(quote => (
                        <li key={quote._id} className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">{quote.buyer?.companyName || 'Unknown Company'}</h3>
                                    <p className="text-sm text-gray-500">{quote.buyer?.name} • {new Date(quote.createdAt).toLocaleDateString()}</p>
                                </div>
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold uppercase ${quote.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-600'}`}>
                                    {quote.status}
                                </span>
                            </div>

                            <div className="mb-4 bg-gray-50 p-4 rounded text-sm">
                                {quote.items.map((item, idx) => (
                                    <div key={idx} className="flex justify-between mb-2">
                                        <span>{item.service?.name}</span>
                                        <span className="font-mono">{item.quantity} kg</span>
                                    </div>
                                ))}
                                <p className="text-gray-500 text-xs mt-2 italic">Notes: {quote.items[0]?.notes}</p>
                            </div>

                            <div className="flex space-x-4">
                                {quote.status === 'pending' && (
                                    <button
                                        onClick={() => setResponseForm({ id: quote._id, price: 0, notes: '' })}
                                        className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                                    >
                                        Reply with Quote
                                    </button>
                                )}
                                {quote.status === 'accepted' && (
                                    <button
                                        onClick={() => handleConvertToOrder(quote)}
                                        className="bg-green-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-green-700"
                                    >
                                        Convert to Order
                                    </button>
                                )}
                            </div>

                            {/* Response Form */}
                            {responseForm?.id === quote._id && (
                                <div className="mt-4 border-t pt-4">
                                    <h4 className="text-sm font-medium mb-2">Send Quotation Response</h4>
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <input
                                            type="number"
                                            placeholder="Total Price (₹)"
                                            className="border p-2 rounded w-full"
                                            value={responseForm.price}
                                            onChange={e => setResponseForm({ ...responseForm, price: Number(e.target.value) })}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Terms / Notes"
                                            className="border p-2 rounded w-full"
                                            value={responseForm.notes}
                                            onChange={e => setResponseForm({ ...responseForm, notes: e.target.value })}
                                        />
                                    </div>
                                    <div className="mt-2 flex space-x-2">
                                        <button onClick={handleSendResponse} className="bg-primary-600 text-white px-4 py-2 rounded text-sm">Send</button>
                                        <button onClick={() => setResponseForm(null)} className="text-gray-600 px-4 py-2">Cancel</button>
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
