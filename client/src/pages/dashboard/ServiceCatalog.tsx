import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../../context/CartContext';
import { Plus, ShoppingCart } from 'lucide-react';

interface Service {
    _id: string;
    name: string;
    description: string;
    category: string;
    indicativePrice: number;
    imageUrl: string;
}

export const ServiceCatalog = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();
    const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        const fetchServices = async () => {
            try {
                // For demo, if 0 services, maybe seed some locally or wait for admin to add
                // We'll try to fetch, if empty we might show empty state
                const res = await axios.get('http://localhost:5000/api/services');
                setServices(res.data);

                // Demo Data if backend empty
                if (res.data.length === 0) {
                    setServices([
                        { _id: '1', name: 'Cotton Reactive Dyeing', description: 'High fastness reactive dyeing for knitted cotton fabrics.', category: 'Cotton', indicativePrice: 180, imageUrl: 'https://images.unsplash.com/photo-1620799140408-ed5341cd2431?auto=format&fit=crop&q=80&w=600' },
                        { _id: '2', name: 'Polyester Disperse Dyeing', description: 'Jet dyeing process for polyester with high temperature setting.', category: 'Polyester', indicativePrice: 140, imageUrl: 'https://images.unsplash.com/photo-1613535449480-941211328469?auto=format&fit=crop&q=80&w=600' },
                        { _id: '3', name: 'Garment Enzyme Wash', description: 'Bio-wash finishing for softness and surface clean.', category: 'Washing', indicativePrice: 40, imageUrl: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&q=80&w=600' }
                    ]);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
    }, []);

    const handleAdd = (service: Service) => {
        const qty = quantities[service._id] || 100;
        addToCart({
            serviceId: service._id,
            name: service.name,
            indicativePrice: service.indicativePrice,
            quantity: qty,
            notes: '',
        });
        alert(`Added ${service.name} to Quote Cart`);
    };

    if (loading) return <div>Loading Catalog...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Service Catalog</h1>
                <div className="flex space-x-2">
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">Cotton</span>
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">Polyester</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map(service => (
                    <div key={service._id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition">
                        <div className="h-48 overflow-hidden">
                            <img src={service.imageUrl} alt={service.name} className="w-full h-full object-cover transform hover:scale-105 transition duration-500" />
                        </div>
                        <div className="p-5">
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="text-xs font-semibold text-primary-600 uppercase tracking-wide">{service.category}</span>
                                    <h3 className="text-lg font-bold text-gray-900 mt-1">{service.name}</h3>
                                </div>
                                <span className="text-sm font-medium bg-gray-50 text-gray-600 px-2 py-1 rounded">₹{service.indicativePrice}/kg</span>
                            </div>
                            <p className="text-gray-500 text-sm mt-3 line-clamp-2">{service.description}</p>

                            <div className="mt-5 flex items-center space-x-3">
                                <div className="flex-1 relative rounded-md shadow-sm">
                                    <input
                                        type="number"
                                        className="focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                        placeholder="Qty (kg)"
                                        min="10"
                                        value={quantities[service._id] || ''}
                                        onChange={(e) => setQuantities({ ...quantities, [service._id]: parseInt(e.target.value) })}
                                    />
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <span className="text-gray-500 sm:text-sm">kg</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleAdd(service)}
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
                                >
                                    <Plus className="h-4 w-4 mr-2" /> Add
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
