import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowRight } from 'lucide-react';

export const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center">
                            <span className="text-xl font-bold text-primary-600">Goodwill<span className="text-gray-900"> Process Dyeworks</span></span>
                        </Link>
                    </div>

                    <div className="hidden sm:flex sm:items-center sm:space-x-8">
                        <Link to="/services" className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">Services</Link>
                        <Link to="/process" className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">Process</Link>
                        <Link to="/compliance" className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">Compliance</Link>
                        <Link to="/contact" className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">Contact</Link>

                        {isAuthenticated ? (
                            <div className="flex items-center space-x-4">
                                <Link to="/dashboard" className="text-gray-700 font-medium hover:text-primary-600">
                                    Dashboard
                                </Link>
                                <button onClick={handleLogout} className="text-gray-500 hover:text-red-600 text-sm">
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <Link to="/login" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">Login</Link>
                                <Link to="/register" className="bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700 transition flex items-center">
                                    Get Quote <ArrowRight className="ml-1 w-4 h-4" />
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};
