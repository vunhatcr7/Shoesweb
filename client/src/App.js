import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
// import PrivateRoute from './components/PrivateRoute';
import Profile from './pages/Profile';
import Wishlist from './pages/Wishlist';
import AuthPage from './pages/AuthPage';
import About from './pages/About';
import ProductListAdmin from './pages/admin/ProductListAdmin';
import ProductFormAdmin from './pages/admin/ProductFormAdmin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminSidebar from './components/AdminSidebar';
import ThemeToggleButton from './components/ThemeToggleButton';
import OrderListAdmin from './pages/admin/OrderListAdmin';
import UserListAdmin from './pages/admin/UserListAdmin';
import VoucherListAdmin from './pages/admin/VoucherListAdmin';
import ReviewListAdmin from './pages/admin/ReviewListAdmin';
import RoleListAdmin from './pages/admin/RoleListAdmin';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from './components/ScrollToTop';
import Breadcrumbs from './components/Breadcrumbs';

function AppContent() {
  const [wishlist, setWishlist] = useState([]);
  const location = useLocation();
  const hideNav = ['/auth'].includes(location.pathname);
  const isAdminRoute = location.pathname.startsWith('/admin');
  const showBreadcrumbs = [
    '/products',
    '/product',
    '/cart',
    '/profile',
    '/wishlist',
    '/checkout',
    '/orders',
    '/about',
  ].some((p) => location.pathname.startsWith(p));
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      {hideNav && <ThemeToggleButton />}
      {isAdminRoute ? (
        <div className="flex min-h-screen">
          <AdminSidebar />
          <div className="flex-1">
            <main className="flex-grow">
              <Routes>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/products" element={<ProductListAdmin />} />
                <Route path="/admin/products/new" element={<ProductFormAdmin />} />
                <Route path="/admin/products/:id/edit" element={<ProductFormAdmin />} />
                <Route path="/admin/orders" element={<OrderListAdmin />} />
                <Route path="/admin/users" element={<UserListAdmin />} />
                <Route path="/admin/vouchers" element={<VoucherListAdmin />} />
                <Route path="/admin/reviews" element={<ReviewListAdmin />} />
                <Route path="/admin/roles" element={<RoleListAdmin />} />
                {/* Thêm các route admin khác ở đây */}
              </Routes>
            </main>
          </div>
        </div>
      ) : (
        <>
          {!hideNav && <Navbar wishlistCount={wishlist.length} />}
          {showBreadcrumbs && <Breadcrumbs />}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home wishlist={wishlist} setWishlist={setWishlist} />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/wishlist" element={<Wishlist wishlist={wishlist} setWishlist={setWishlist} />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
          {!hideNav && <Footer />}
        </>
      )}
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
