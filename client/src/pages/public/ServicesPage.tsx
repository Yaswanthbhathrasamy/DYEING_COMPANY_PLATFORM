import { useEffect, useState } from 'react';
import axios from 'axios';
import { Droplets, Palette, Layers, Sparkles, Box, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

interface Service {
    _id: string;
    name: string;
    description: string;
    category: string;
    indicativePrice: number;
    imageUrl: string;
    unit: string; // Ensure unit is in interface
    materialType?: string;
    isActive?: boolean;
}

export const ServicesPage = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/services?active=true');
                setServices(res.data);
            } catch (err) {
                console.error(err);
                // Fallback for Demo / Offline Mode
                setServices([
                    { _id: '1', name: 'Cotton Reactive Dyeing (Demo)', description: 'Premium reactive dyeing for cotton.', category: 'Cotton', indicativePrice: 180, imageUrl: '', unit: 'kg', materialType: 'Fabric', isActive: true },
                    { _id: '2', name: 'Polyester HTHP Dyeing (Demo)', description: 'High temp dyeing for polyester.', category: 'Polyester', indicativePrice: 140, imageUrl: '', unit: 'kg', materialType: 'Yarn', isActive: true },
                    { _id: '3', name: 'Bio-Washing (Demo)', description: 'Enzyme treatment for softness.', category: 'Washing', indicativePrice: 40, imageUrl: '', unit: 'kg', materialType: 'Fabric', isActive: true }
                ]);
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
    }, []);

    // Helper to get icon based on category (optional visual flair)
    const getIcon = (category: string) => {
        const cat = category.toLowerCase();
        if (cat.includes('cotton')) return Droplets;
        if (cat.includes('polyester')) return Palette;
        if (cat.includes('wash')) return Sparkles;
        if (cat.includes('print')) return Layers;
        return Box;
    };

    const { addToCart, cartTotalConfig } = useCart();

    const handleAddToCart = (service: Service) => {
        addToCart({
            serviceId: service._id,
            name: service.name,
            indicativePrice: service.indicativePrice,
            quantity: 100, // Default quantity, user can change in cart
            unit: service.unit || 'kg',
            notes: ''
        });
        alert('Added to cart!');
    };

    return (
        <div className="bg-white">
            {/* Cart Floating Button (Visible if items in cart) */}
            {cartTotalConfig > 0 && (
                <Link to="/dashboard/cart" className="fixed bottom-8 right-8 z-50 bg-primary-600 text-white p-4 rounded-full shadow-lg hover:bg-primary-700 transition-all">
                    <div className="relative">
                        <ShoppingCart className="h-6 w-6" />
                        <span className="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                            {cartTotalConfig}
                        </span>
                    </div>
                </Link>
            )}

            {/* Hero */}
            <div className="relative bg-gray-900 py-24 sm:py-32">
                <div className="absolute inset-0 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1598000780210-410a01210878?q=80&w=2676&auto=format&fit=crop" alt="" className="w-full h-full object-cover opacity-20" />
                </div>
                <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Our Services</h1>
                        <p className="mt-6 text-lg leading-8 text-gray-300">
                            State-of-the-art textile processing solutions tailored for global brands and local manufacturers.
                        </p>
                    </div>
                </div>
            </div>

            {/* List */}
            <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
                <div className="mx-auto max-w-2xl lg:max-w-none">
                    {loading ? (
                        <div className="text-center">Loading Services...</div>
                    ) : (
                        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-16">
                            {services.map((service) => {
                                const Icon = getIcon(service.category);
                                return (
                                    <div key={service._id} className="flex flex-col sm:flex-row gap-6">
                                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                                            <Icon className="h-8 w-8" />
                                        </div>
                                        <div className="flex-auto">
                                            <h3 className="text-xl font-bold tracking-tight text-gray-900">{service.name}</h3>
                                            <p className="mt-3 text-base leading-7 text-gray-600">{service.description}</p>
                                            <div className="mt-2 text-sm font-semibold text-gray-500">
                                                Category: {service.category} | Price: ₹{service.indicativePrice}/{service.unit || 'kg'}
                                            </div>
                                            <div className="mt-4 flex gap-4">
                                                <button
                                                    onClick={() => handleAddToCart(service)}
                                                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                                                >
                                                    Add to Cart
                                                </button>
                                                <Link to="/register" className="text-sm font-semibold leading-6 text-primary-600 hover:text-primary-500 py-2.5">
                                                    Get a Quote <span aria-hidden="true">→</span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            {services.length === 0 && (
                                <div className="col-span-2 text-center text-gray-500">No active services at the moment.</div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* CTA */}
            <div className="bg-primary-50">
                <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Ready to process your fabric?<br />
                        <span className="text-primary-600">Start with a free quotation today.</span>
                    </h2>
                    <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
                        <Link to="/register" className="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600">
                            Get started
                        </Link>
                        <Link to="/contact" className="text-sm font-semibold leading-6 text-gray-900">
                            Contact sales <span aria-hidden="true">→</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
