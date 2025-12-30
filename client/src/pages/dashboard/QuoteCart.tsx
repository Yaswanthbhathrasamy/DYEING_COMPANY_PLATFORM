import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { Trash2, Send, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const QuoteCart = () => {
    const { items, removeFromCart, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleRequestQuote = async () => {
        if (items.length === 0) return;

        try {
            const payload = {
                buyerId: user?.id,
                items: items.map(i => ({
                    service: i.serviceId,
                    quantity: i.quantity,
                    notes: i.notes
                }))
            };

            await axios.post('http://localhost:5000/api/quotes', payload);
            clearCart();
            navigate('/dashboard/quotes'); // We need to create this page or redirect to dashboard
            alert('Quote requested successfully!');
        } catch (err) {
            console.error(err);
            alert('Failed to submit quote');
        }
    };

    if (items.length === 0) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Quote Cart is Empty</h2>
                <p className="text-gray-500 mb-8">Browse our catalog to add dyeing services.</p>
                <Link to="/dashboard/catalog" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700">
                    Browse Services <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Request Quotation</h1>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
                <ul className="divide-y divide-gray-200">
                    {items.map((item) => (
                        <li key={item.serviceId} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                            <div>
                                <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                                <p className="text-sm text-gray-500">Indicative Price: ₹{item.indicativePrice}/kg</p>
                            </div>
                            <div className="flex items-center space-x-6">
                                <div className="text-right">
                                    <span className="block text-sm font-medium text-gray-900">Qty: {item.quantity} kg</span>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.serviceId)}
                                    className="text-red-600 hover:text-red-900 p-2"
                                >
                                    <Trash2 className="h-5 w-5" />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="px-6 py-4 bg-gray-50 flex justify-between items-center">
                    <span className="text-gray-500 text-sm">Total Items: {items.length}</span>
                    <span className="text-gray-900 font-bold">Total Estimated Qty: {items.reduce((acc, i) => acc + i.quantity, 0)} kg</span>
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    onClick={handleRequestQuote}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                    <Send className="mr-2 h-5 w-5" /> Submit Request
                </button>
            </div>
        </div>
    );
};
