import { useCart } from '../../context/CartContext';
import { Trash2 } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Cart = () => {
    const { items, removeFromCart, totalPrice, clearCart } = useCart();
    const navigate = useNavigate();

    const handleSubmitOrder = async () => {
        if (items.length === 0) return;
        try {
            const token = localStorage.getItem('token');
            const itemsPayload = items.map(item => ({
                service: item.serviceId,
                quantity: item.quantity,
                notes: item.notes
            }));

            await axios.post('http://localhost:5000/api/orders',
                { items: itemsPayload },
                { headers: { 'x-auth-token': token } }
            );

            clearCart();
            alert('Order Submitted Successfully!');
            navigate('/dashboard/orders');
        } catch (err) {
            console.error(err);
            alert('Failed to submit order');
        }
    };

    if (items.length === 0) {
        return (
            <div className="p-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900">Your Cart is Empty</h2>
                <p className="mt-2 text-gray-600">Add some services to get started.</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

            <div className="bg-white shadow rounded-lg overflow-hidden">
                <ul className="divide-y divide-gray-200">
                    {items.map((item) => (
                        <li key={item.id} className="p-6 flex items-center justify-between">
                            <div className="flex-1">
                                <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                                <p className="text-sm text-gray-500">Unit: {item.unit}</p>
                                <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                            </div>
                            <div className="text-right flex items-center gap-6">
                                <div>
                                    <p className="text-lg font-semibold text-gray-900">Running Total (Est):</p>
                                    <p className="text-xl font-bold text-primary-600">₹{item.indicativePrice * item.quantity}</p>
                                </div>
                                <button
                                    onClick={() => item.id && removeFromCart(item.id)}
                                    className="text-red-600 hover:text-red-800 p-2"
                                >
                                    <Trash2 className="h-5 w-5" />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="bg-gray-50 p-6 flex items-center justify-between border-t border-gray-200">
                    <div>
                        <p className="text-sm text-gray-500">Estimated Total (Pending Approval)</p>
                        <p className="text-3xl font-bold text-gray-900">₹{totalPrice}</p>
                    </div>
                    <button
                        onClick={handleSubmitOrder}
                        className="bg-primary-600 text-white px-8 py-3 rounded-md hover:bg-primary-700 font-semibold shadow-lg transition-all"
                    >
                        Submit Order
                    </button>
                </div>
            </div>
        </div>
    );
};
