import { Link } from 'react-router-dom';
import { PublicLayout } from '../layout/PublicLayout';
import { ArrowRight, CheckCircle, Droplets, Truck, Award } from 'lucide-react';
import LiquidEther from '../components/LiquidEther';

export const Home = () => {
    return (
        <PublicLayout>
            {/* Hero Section */}
            <div className="relative isolate overflow-hidden">
                {/* Liquid Ether Background */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
                    <LiquidEther
                        colors={['#5227FF', '#FF9FFC', '#B19EEF']}
                        mouseForce={20}
                        cursorSize={100}
                        isViscous={false}
                        viscous={30}
                        iterationsViscous={32}
                        iterationsPoisson={32}
                        resolution={0.5}
                        isBounce={false}
                        autoDemo={true}
                        autoSpeed={0.5}
                        autoIntensity={2.2}
                        takeoverDuration={0.25}
                        autoResumeDelay={3000}
                        autoRampDuration={0.6}
                    />
                </div>

                <div className="mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40 relative z-10 pointer-events-none">
                    <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8 pointer-events-auto">
                        <div className="mt-24 sm:mt-32 lg:mt-16">
                            <span className="rounded-full bg-primary-600/10 px-3 py-1 text-sm font-semibold leading-6 text-primary-600 ring-1 ring-inset ring-primary-600/10">
                                Premium Textile Processing
                            </span>
                        </div>
                        <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                            Dyeing Excellence for the Modern World
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            We deliver high-quality dyeing, printing, and finishing services with a commitment to sustainable practices and rapid turnaround times.
                        </p>
                        <div className="mt-10 flex items-center gap-x-6">
                            <Link to="/register" className="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600">
                                Get a Quote <ArrowRight className="inline-block ml-1 w-4 h-4" />
                            </Link>
                            <Link to="/services" className="text-sm font-semibold leading-6 text-gray-900">
                                Explore Services <span aria-hidden="true">→</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats / Features */}
            <div className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-8 rounded-2xl bg-gray-50 hover:bg-gray-100 transition duration-300">
                            <Droplets className="h-10 w-10 text-secondary-500 mb-4" />
                            <h3 className="text-xl font-bold mb-2">50 Tonnes/Day</h3>
                            <p className="text-gray-600">High-capacity dyeing units capable of handling bulk orders with consistent quality.</p>
                        </div>
                        <div className="p-8 rounded-2xl bg-gray-50 hover:bg-gray-100 transition duration-300">
                            <Truck className="h-10 w-10 text-primary-500 mb-4" />
                            <h3 className="text-xl font-bold mb-2">Real-Time Tracking</h3>
                            <p className="text-gray-600">Track your fabric from dyeing to finishing live on your dashboard.</p>
                        </div>
                        <div className="p-8 rounded-2xl bg-gray-50 hover:bg-gray-100 transition duration-300">
                            <Award className="h-10 w-10 text-accent-500 mb-4" />
                            <h3 className="text-xl font-bold mb-2">ZLD Compliant</h3>
                            <p className="text-gray-600">Zero Liquid Discharge facility ensuring 100% environmental compliance.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Compliance Section */}
            <div className="py-20 bg-gray-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 mb-10 md:mb-0">
                        <h2 className="text-3xl font-bold mb-6">Commited to Sustainability</h2>
                        <ul className="space-y-4">
                            <li className="flex items-center"><CheckCircle className="text-green-400 mr-3" /> Zero Liquid Discharge (ZLD) Plant</li>
                            <li className="flex items-center"><CheckCircle className="text-green-400 mr-3" /> Oeko-Tex Standard 100 Certified</li>
                            <li className="flex items-center"><CheckCircle className="text-green-400 mr-3" /> 24/7 Pollution Control Board Monitoring</li>
                        </ul>
                    </div>
                    <div className="md:w-1/2">
                        <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
                            <h3 className="text-xl font-semibold mb-4">Live ETP Status</h3>
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-gray-400">pH Level</span>
                                <span className="text-green-400 font-mono">7.2 (Normal)</span>
                            </div>
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-gray-400">TDS Outlet</span>
                                <span className="text-green-400 font-mono">&lt; 100 ppm</span>
                            </div>
                            <div className="mt-6 pt-6 border-t border-gray-700 text-center text-xs text-gray-500">
                                Data updated in real-time
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
};
