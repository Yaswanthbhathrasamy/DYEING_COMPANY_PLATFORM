import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';
import { Plus, Trash2, Edit2, X } from 'lucide-react';

interface Service {
    _id?: string;
    name: string;
    description: string;
    category: string;
    indicativePrice: number;
    imageUrl: string;
}

export const ServiceManager = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentService, setCurrentService] = useState<Service | null>(null);
    const { user } = useAuth();

    const fetchServices = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/services');
            setServices(res.data);
        } catch (err) { console.error(err); }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this service?')) return;
        try {
            await axios.delete(`http://localhost:5000/api/services/${id}`);
            fetchServices();
        } catch (err) { console.error(err); }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentService) return;

        try {
            if (currentService._id) {
                await axios.put(`http://localhost:5000/api/services/${currentService._id}`, currentService);
            } else {
                await axios.post('http://localhost:5000/api/services', currentService);
            }
            setIsEditing(false);
            setCurrentService(null);
            fetchServices();
        } catch (err) { console.error(err); }
    };

    const openEdit = (service: Service = { name: '', description: '', category: '', indicativePrice: 0, imageUrl: '' }) => {
        setCurrentService(service);
        setIsEditing(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Manage Services</h1>
                <button
                    onClick={() => openEdit()}
                    className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                >
                    <Plus className="w-5 h-5 mr-2" /> Add Service
                </button>
            </div>

            {isEditing && currentService && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center -m-10 z-50 overflow-y-auto">
                    <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">{currentService._id ? 'Edit Service' : 'New Service'}</h2>
                            <button onClick={() => setIsEditing(false)}><X className="w-6 h-6 text-gray-400" /></button>
                        </div>
                        <form onSubmit={handleSave} className="space-y-4">
                            <input
                                className="border p-2 w-full rounded"
                                placeholder="Service Name"
                                value={currentService.name}
                                onChange={e => setCurrentService({ ...currentService, name: e.target.value })}
                                required
                            />
                            <textarea
                                className="border p-2 w-full rounded"
                                placeholder="Description"
                                value={currentService.description}
                                onChange={e => setCurrentService({ ...currentService, description: e.target.value })}
                                required
                            />
                            <select
                                className="border p-2 w-full rounded"
                                value={currentService.category}
                                onChange={e => setCurrentService({ ...currentService, category: e.target.value })}
                                required
                            >
                                <option value="">Select Category</option>
                                <option value="Cotton">Cotton</option>
                                <option value="Polyester">Polyester</option>
                                <option value="Washing">Washing</option>
                                <option value="Printing">Printing</option>
                            </select>
                            <input
                                type="number"
                                className="border p-2 w-full rounded"
                                placeholder="Indicative Price (₹/kg)"
                                value={currentService.indicativePrice}
                                onChange={e => setCurrentService({ ...currentService, indicativePrice: Number(e.target.value) })}
                                required
                            />
                            <input
                                className="border p-2 w-full rounded"
                                placeholder="Image URL"
                                value={currentService.imageUrl}
                                onChange={e => setCurrentService({ ...currentService, imageUrl: e.target.value })}
                            />
                            <button type="submit" className="w-full bg-primary-600 text-white py-2 rounded font-semibold hover:bg-primary-700">Save Service</button>
                        </form>
                    </div>
                </div>
            )}

            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                    {services.map(service => (
                        <li key={service._id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                            <div>
                                <h3 className="text-lg font-medium text-gray-900">{service.name}</h3>
                                <p className="text-sm text-gray-500">{service.category} • ₹{service.indicativePrice}/kg</p>
                            </div>
                            <div className="flex space-x-2">
                                <button onClick={() => openEdit(service)} className="text-blue-600 hover:text-blue-900 p-2 bg-blue-50 rounded-full"><Edit2 className="w-4 h-4" /></button>
                                <button onClick={() => handleDelete(service._id!)} className="text-red-600 hover:text-red-900 p-2 bg-red-50 rounded-full"><Trash2 className="w-4 h-4" /></button>
                            </div>
                        </li>
                    ))}
                    {services.length === 0 && <li className="p-4 text-center text-gray-500">No services found. Add one to start.</li>}
                </ul>
            </div>
        </div>
    );
};
