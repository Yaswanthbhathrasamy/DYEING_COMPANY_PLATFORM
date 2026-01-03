import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { DashboardLayout } from './layout/DashboardLayout';

// Lazy Loaded Components
const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const Login = lazy(() => import('./pages/Login').then(module => ({ default: module.Login })));
const Register = lazy(() => import('./pages/Register').then(module => ({ default: module.Register })));

const DashboardHome = lazy(() => import('./pages/dashboard/DashboardHome').then(module => ({ default: module.DashboardHome })));
const ServiceCatalog = lazy(() => import('./pages/dashboard/ServiceCatalog').then(module => ({ default: module.ServiceCatalog })));
const QuoteCart = lazy(() => import('./pages/dashboard/Cart').then(module => ({ default: module.Cart }))); // Replaced with new Cart component
const MyQuotes = lazy(() => import('./pages/dashboard/MyQuotes').then(module => ({ default: module.MyQuotes })));
const MyOrders = lazy(() => import('./pages/dashboard/MyOrders').then(module => ({ default: module.MyOrders })));

const QuoteManager = lazy(() => import('./pages/dashboard/admin/QuoteManager').then(module => ({ default: module.QuoteManager })));
const OrderOps = lazy(() => import('./pages/dashboard/admin/OrderOps').then(module => ({ default: module.OrderOps })));
const ServiceManager = lazy(() => import('./pages/dashboard/admin/ServiceManager').then(module => ({ default: module.ServiceManager })));

const ServicesPage = lazy(() => import('./pages/public/ServicesPage').then(module => ({ default: module.ServicesPage })));
const ProcessPage = lazy(() => import('./pages/public/ProcessPage').then(module => ({ default: module.ProcessPage })));
const CompliancePage = lazy(() => import('./pages/public/CompliancePage').then(module => ({ default: module.CompliancePage })));
const ContactPage = lazy(() => import('./pages/public/ContactPage').then(module => ({ default: module.ContactPage })));

// Loading Component
const PageLoader = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
  </div>
);

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole }: { children: React.ReactElement, requiredRole?: 'admin' | 'buyer' }) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (requiredRole && user?.role !== requiredRole) return <Navigate to="/dashboard" />;

  return <DashboardLayout>{children}</DashboardLayout>;
};

function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/process" element={<ProcessPage />} />
        <Route path="/compliance" element={<CompliancePage />} />
        <Route path="/contact" element={<ContactPage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard Routes (Common) */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardHome />
          </ProtectedRoute>
        } />

        {/* Buyer Routes */}
        <Route path="/dashboard/catalog" element={
          <ProtectedRoute>
            <ServiceCatalog />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/cart" element={
          <ProtectedRoute>
            <QuoteCart />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/quotes" element={
          <ProtectedRoute>
            <MyQuotes />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/orders" element={
          <ProtectedRoute>
            <MyOrders />
          </ProtectedRoute>
        } />

        {/* Admin Routes */}
        <Route path="/dashboard/admin/quotes" element={
          <ProtectedRoute requiredRole="admin">
            <QuoteManager />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/admin/orders" element={
          <ProtectedRoute requiredRole="admin">
            <OrderOps />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/admin/services" element={
          <ProtectedRoute requiredRole="admin">
            <ServiceManager />
          </ProtectedRoute>
        } />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppRoutes />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
