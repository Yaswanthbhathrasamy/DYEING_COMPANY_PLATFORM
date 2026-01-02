import type { ReactNode } from 'react';
import { Navbar } from '../components/Navbar';
import { Chatbot } from '../components/Chatbot';

export const PublicLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main>
                {children}
            </main>
            <Chatbot />
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">DYEMASTER</h3>
                        <p className="text-gray-400 text-sm">Premium industrial dyeing services for the modern textile industry. Sustainable, compliant, and efficient.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4 text-gray-200">Services</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li>Cotton Dyeing</li>
                            <li>Polyester Dyeing</li>
                            <li>Fabric Printing</li>
                            <li>Washing & Finishing</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4 text-gray-200">Company</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li>About Us</li>
                            <li>Compliance (ETP/ZLD)</li>
                            <li>Gallery</li>
                            <li>Contact</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4 text-gray-200">Contact</h4>
                        <p className="text-gray-400 text-sm mb-2">123 Textile Park, Tirupur, TN, India</p>
                        <p className="text-gray-400 text-sm mb-2">+91 98765 43210</p>
                        <p className="text-gray-400 text-sm">info@dyemaster.in</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};
