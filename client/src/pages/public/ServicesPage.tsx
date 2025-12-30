import { ArrowRight, Droplets, Palette, Layers, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
    {
        title: 'Cotton Dyeing',
        description: 'Premium reactive and vat dyeing for cellulosic fibers with excellent color fastness.',
        icon: Droplets,
        color: 'bg-blue-50 text-blue-600'
    },
    {
        title: 'Polyester Dyeing',
        description: 'High-temperature high-pressure (HTHP) dyeing ensuring deep penetration and vibrant shades.',
        icon: Palette,
        color: 'bg-purple-50 text-purple-600'
    },
    {
        title: 'Bio-Washing',
        description: 'Enzyme treatment for removing fuzz and pilling, providing a softer, smoother fabric hand.',
        icon: Sparkles,
        color: 'bg-green-50 text-green-600'
    },
    {
        title: 'Fabric Printing',
        description: 'Rotary and digital printing services for intricate designs and patterns.',
        icon: Layers,
        color: 'bg-orange-50 text-orange-600'
    }
];

export const ServicesPage = () => {
    return (
        <div className="bg-white">
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
                    <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-16">
                        {services.map((service) => {
                            const Icon = service.icon;
                            return (
                                <div key={service.title} className="flex flex-col sm:flex-row gap-6">
                                    <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-lg ${service.color}`}>
                                        <Icon className="h-8 w-8" />
                                    </div>
                                    <div className="flex-auto">
                                        <h3 className="text-xl font-bold tracking-tight text-gray-900">{service.title}</h3>
                                        <p className="mt-3 text-base leading-7 text-gray-600">{service.description}</p>
                                        <div className="mt-4">
                                            <Link to="/register" className="text-sm font-semibold leading-6 text-primary-600 hover:text-primary-500">
                                                Get a Quote <span aria-hidden="true">→</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
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
