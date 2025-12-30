import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    LayoutDashboard,
    ShoppingBag,
    FileText,
    Settings,
    LogOut,
    Package,
    Droplets
} from 'lucide-react';
import clsx from 'clsx';

export const DashboardLayout = ({ children }: { children: ReactNode }) => {
    const { user, logout } = useAuth();
    const location = useLocation();

    const isAdmin = user?.role === 'admin';

    const NavItem = ({ to, icon: Icon, label }: { to: string, icon: any, label: string }) => (
        <Link
            to={to}
            className={clsx(
                "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors group",
                location.pathname === to
                    ? "bg-primary-50 text-primary-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            )}
        >
            <Icon className={clsx("mr-3 h-5 w-5", location.pathname === to ? "text-primary-600" : "text-gray-400 group-hover:text-gray-500")} />
            {label}
        </Link>
    );

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
                <div className="h-16 flex items-center px-6 border-b border-gray-100">
                    <span className="text-xl font-bold text-primary-600">DYE<span className="text-gray-900">MASTER</span></span>
                </div>

                <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                    <NavItem to="/dashboard" icon={LayoutDashboard} label="Overview" />

                    {isAdmin ? (
                        <>
                            <div className="pt-4 pb-2 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Administration</div>
                            <NavItem to="/dashboard/quotes" icon={FileText} label="Quote Requests" />
                            <NavItem to="/dashboard/orders" icon={Package} label="Order Management" />
                            <NavItem to="/dashboard/services" icon={Droplets} label="Service Catalog" />
                        </>
                    ) : (
                        <>
                            <div className="pt-4 pb-2 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Procurement</div>
                            <NavItem to="/dashboard/catalog" icon={ShoppingBag} label="Browse Services" />
                            <NavItem to="/dashboard/cart" icon={FileText} label="Quote Cart" />
                            <NavItem to="/dashboard/orders" icon={Package} label="My Orders" />
                        </>
                    )}

                    <div className="pt-4 pb-2 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Account</div>
                    <NavItem to="/dashboard/profile" icon={Settings} label="Settings" />
                </div>

                <div className="p-4 border-t border-gray-200">
                    <div className="flex items-center mb-4">
                        <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-xs">
                            {user?.name.charAt(0)}
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                            <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                        </div>
                    </div>
                    <button
                        onClick={logout}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <LogOut className="mr-3 h-4 w-4" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <div className="py-6 px-4 sm:px-6 lg:px-8">
                    {children}
                </div>
            </main>
        </div>
    );
};
