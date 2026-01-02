import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../../context/CartContext';
import { Plus } from 'lucide-react';

interface Service {
    _id: string;
    name: string;
    description: string;
    category: string;
    indicativePrice: number;
    imageUrl: string;
    unit: string;
    materialType: 'Fabric' | 'Yarn' | 'Both';
    isActive?: boolean;
}

export const ServiceCatalog = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    // Config Modal State
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [config, setConfig] = useState({
        quantity: 100,
        fabricType: '',
        colorDetails: '',
        urgency: 'Standard',
        notes: ''
    });

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/services?active=true');
                setServices(res.data);
            } catch (err) {
                console.error(err);
                // Fallback for Demo / Offline Mode
                setServices([
                    { _id: '1', name: 'Cotton Reactive Dyeing (Demo)', description: 'Premium reactive dyeing for cotton.', category: 'Cotton', indicativePrice: 180, imageUrl: 'https://placehold.co/600x400/e2e8f0/1e293b?text=Cotton+Dyeing', unit: 'kg', materialType: 'Fabric', isActive: true },
                    { _id: '2', name: 'Polyester HTHP Dyeing (Demo)', description: 'High temp dyeing for polyester.', category: 'Polyester', indicativePrice: 140, imageUrl: 'https://placehold.co/600x400/e2e8f0/1e293b?text=Polyester+Dyeing', unit: 'kg', materialType: 'Yarn', isActive: true },
                    { _id: '3', name: 'Bio-Washing (Demo)', description: 'Enzyme treatment for softness.', category: 'Washing', indicativePrice: 40, imageUrl: 'https://placehold.co/600x400/e2e8f0/1e293b?text=Bio+Washing', unit: 'kg', materialType: 'Fabric', isActive: true }
                ]);
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
    }, []);

    const openConfig = (service: Service) => {
        setSelectedService(service);
        setConfig({
            quantity: 100,
            fabricType: service.materialType === 'Both' ? 'Fabric' : service.materialType,
            colorDetails: '',
            urgency: 'Standard',
            notes: ''
        });
    };

    const handleAddToCart = () => {
        if (!selectedService) return;
        addToCart({
            serviceId: selectedService._id,
            name: selectedService.name,
            indicativePrice: selectedService.indicativePrice,
            quantity: config.quantity,
            unit: selectedService.unit,
            fabricType: config.fabricType,
            colorDetails: config.colorDetails,
            urgency: config.urgency,
            notes: config.notes
        });
        setSelectedService(null);
        alert('Added to Quote Cart');
    };

    if (loading) {
        return (
            <div>
                <div className="flex justify-between items-center mb-6">
                    <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col animate-pulse">
                            <div className="h-48 bg-gray-200 w-full"></div>
                            <div className="p-5 flex-1 space-y-3">
                                <div className="flex justify-between">
                                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                                </div>
                                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                                <div className="space-y-2">
                                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                                </div>
                                <div className="h-10 bg-gray-200 rounded w-full mt-4"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Service Catalog</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map(service => (
                    <div key={service._id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition flex flex-col">
                        <div className="h-48 overflow-hidden">
                            <img src={service.imageUrl} alt={service.name} className="w-full h-full object-cover transform hover:scale-105 transition duration-500" />
                        </div>
                        <div className="p-5 flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <span className="text-xs font-semibold text-primary-600 uppercase tracking-wide">{service.category}</span>
                                    <h3 className="text-lg font-bold text-gray-900 mt-1">{service.name}</h3>
                                </div>
                                <span className="text-sm font-medium bg-gray-50 text-gray-600 px-2 py-1 rounded">₹{service.indicativePrice}/{service.unit}</span>
                            </div>
                            <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-1">{service.description}</p>

                            <button
                                onClick={() => openConfig(service)}
                                className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
                            >
                                <Plus className="h-4 w-4 mr-2" /> Configure & Add
                            </button>
                        </div>
                    </div>
                ))}
                {services.length === 0 && (
                    <div className="col-span-3 text-center py-10 text-gray-500">
                        No active services found. Please check back later.
                    </div>
                )}
            </div>

            {/* Config Modal */}
            {selectedService && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center -m-10 z-50 overflow-y-auto px-4">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md my-8">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold">Configure {selectedService.name}</h3>
                            <button onClick={() => setSelectedService(null)} className="text-gray-400 hover:text-gray-600">&times;</button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Material Type</label>
                                <select
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    value={config.fabricType}
                                    onChange={e => setConfig({ ...config, fabricType: e.target.value })}
                                    disabled={selectedService.materialType !== 'Both'}
                                >
                                    <option value="Fabric">Fabric</option>
                                    <option value="Yarn">Yarn</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Quantity ({selectedService.unit})</label>
                                <input
                                    type="number"
                                    min="10"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    value={config.quantity}
                                    onChange={e => setConfig({ ...config, quantity: Number(e.target.value) })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Color Details / Shade Code</label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    placeholder="e.g., Pantone 19-4052 or 'Navy Blue'"
                                    value={config.colorDetails}
                                    onChange={e => setConfig({ ...config, colorDetails: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Urgency</label>
                                <select
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    value={config.urgency}
                                    onChange={e => setConfig({ ...config, urgency: e.target.value })}
                                >
                                    <option value="Standard">Standard (5-7 days)</option>
                                    <option value="Urgent">Urgent (3 days) +15%</option>
                                    <option value="Express">Express (24 hrs) +30%</option>
                                </select>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                className="w-full bg-primary-600 text-white py-3 rounded-md font-bold hover:bg-primary-700 mt-2"
                            >
                                Add to Quote Cart
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
