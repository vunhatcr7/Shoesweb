import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminNavbar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <nav className="bg-gray-900 text-white px-6 py-3 shadow flex items-center justify-between z-50">
      <div className="font-bold text-lg flex items-center gap-2">
        <span className="bg-blue-500 px-2 py-1 rounded text-white">Admin</span>
        <span>Dashboard</span>
      </div>
      <div className="flex gap-6">
        <Link to="/admin" className={isActive('/admin') && location.pathname === '/admin' ? 'text-blue-400 font-semibold' : 'hover:text-blue-300'}>Dashboard</Link>
        <Link to="/admin/products" className={isActive('/admin/products') ? 'text-blue-400 font-semibold' : 'hover:text-blue-300'}>Sản phẩm</Link>
        <Link to="/admin/orders" className={isActive('/admin/orders') ? 'text-blue-400 font-semibold' : 'hover:text-blue-300'}>Đơn hàng</Link>
        <Link to="/admin/users" className={isActive('/admin/users') ? 'text-blue-400 font-semibold' : 'hover:text-blue-300'}>Người dùng</Link>
      </div>
      <div>
        <button className="hover:underline">Đăng xuất</button>
      </div>
    </nav>
  );
};

export default AdminNavbar; 