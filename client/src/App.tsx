import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { DashboardLayout } from './layout/DashboardLayout';
import { DashboardHome } from './pages/dashboard/DashboardHome';
import { ServiceCatalog } from './pages/dashboard/ServiceCatalog';
import { QuoteCart } from './pages/dashboard/QuoteCart';
import { MyQuotes } from './pages/dashboard/MyQuotes';
import { MyOrders } from './pages/dashboard/MyOrders';

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole }: { children: JSX.Element, requiredRole?: 'admin' | 'buyer' }) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (requiredRole && user?.role !== requiredRole) return <Navigate to="/dashboard" />;

  return <DashboardLayout>{children}</DashboardLayout>;
};

import { QuoteManager } from './pages/dashboard/admin/QuoteManager';
import { OrderOps } from './pages/dashboard/admin/OrderOps';
import { ServiceManager } from './pages/dashboard/admin/ServiceManager';

import { ServicesPage } from './pages/public/ServicesPage';
import { ProcessPage } from './pages/public/ProcessPage';
import { CompliancePage } from './pages/public/CompliancePage';
import { ContactPage } from './pages/public/ContactPage';

function AppRoutes() {
  return (
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
