import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useSocket } from '../../hooks/useSocket';


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
                // Fallback for Demo / Offline Mode
                console.warn("Fetching quotes failed. Using Demo Data.");
                const demoQuotes = JSON.parse(localStorage.getItem('demo_quotes') || '[]');
                if (demoQuotes.length === 0) {
                    // Add some initial dummy data if empty
                    const initialDemo: Quote[] = [
                        { _id: 'demo-123', items: [{ service: { name: 'Cotton Reactive Dyeing' }, quantity: 500 }], status: 'pending', createdAt: new Date().toISOString() },
                        { _id: 'demo-456', items: [{ service: { name: 'Polyester Dyeing' }, quantity: 200 }], status: 'reviewed', adminResponse: { price: 45000, notes: 'Includes premium finishing' }, createdAt: new Date(Date.now() - 86400000).toISOString() }
                    ];
                    setQuotes(initialDemo);
                    localStorage.setItem('demo_quotes', JSON.stringify(initialDemo));
                } else {
                    setQuotes(demoQuotes);
                }
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

    const [showBillingModal, setShowBillingModal] = useState(false);
    const [selectedQuoteId, setSelectedQuoteId] = useState<string | null>(null);

    // Billing Form State
    const [billingDetails, setBillingDetails] = useState({
        companyName: user?.companyName || '',
        gstNumber: user?.gstNumber || '',
        billingAddress: user?.billingAddress || ''
    });

    const handleAction = async (id: string, status: 'accepted' | 'rejected') => {
        if (status === 'accepted') {
            setSelectedQuoteId(id);
            // Pre-fill form if user has data
            setBillingDetails({
                companyName: user?.companyName || '',
                gstNumber: user?.gstNumber || '',
                billingAddress: user?.billingAddress || ''
            });
            setShowBillingModal(true);
            return;
        }

        // Reject logic remains same
        await submitStatusUpdate(id, 'rejected');
    };

    const submitStatusUpdate = async (id: string, status: 'accepted' | 'rejected', details?: typeof billingDetails) => {
        try {
            await axios.put(`http://localhost:5000/api/quotes/${id}/status`, {
                status,
                billingDetails: details
            });

            setQuotes(prev => prev.map(q => q._id === id ? { ...q, status } : q));

            if (status === 'accepted') {
                alert("Quote Accepted! Order and Invoice have been generated.");
                setShowBillingModal(false);
            }
        } catch (err) {
            console.error(err);
            alert("Action failed. Please try again.");
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
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${styles?.[status as keyof typeof styles] || 'bg-gray-100'}`}>
                {status.toUpperCase()}
            </span>
        );
    };

    return (
        <div className="space-y-6 relative">
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
                                                    Accept & Pay
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

            {/* Billing Modal */}
            {showBillingModal && (
                <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setShowBillingModal(false)}></div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                            <div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">Confirm Billing Details</h3>
                                <div className="mt-2 text-sm text-gray-500">
                                    <p>Please confirm your company and billing details to generate the invoice.</p>
                                </div>
                                <div className="mt-4 space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Company Name</label>
                                        <input
                                            type="text"
                                            value={billingDetails.companyName}
                                            onChange={(e) => setBillingDetails({ ...billingDetails, companyName: e.target.value })}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm border p-2"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">GST Number</label>
                                        <input
                                            type="text"
                                            value={billingDetails.gstNumber}
                                            onChange={(e) => setBillingDetails({ ...billingDetails, gstNumber: e.target.value })}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm border p-2"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Billing Address</label>
                                        <textarea
                                            value={billingDetails.billingAddress}
                                            onChange={(e) => setBillingDetails({ ...billingDetails, billingAddress: e.target.value })}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm border p-2"
                                            rows={3}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:col-start-2 sm:text-sm"
                                    onClick={() => selectedQuoteId && submitStatusUpdate(selectedQuoteId, 'accepted', billingDetails)}
                                >
                                    Confirm Order
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                                    onClick={() => setShowBillingModal(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
