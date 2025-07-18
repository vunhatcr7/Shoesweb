import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { HomeIcon, CubeIcon, UsersIcon, ClipboardDocumentListIcon, SunIcon, MoonIcon, ArrowRightOnRectangleIcon, UserCircleIcon, TicketIcon, ChatBubbleLeftRightIcon, KeyIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../context/ThemeContext';

const menu = [
  { to: '/admin', label: 'Dashboard', icon: <HomeIcon className="w-5 h-5" /> },
  { to: '/admin/products', label: 'Sản phẩm', icon: <CubeIcon className="w-5 h-5" /> },
  { to: '/admin/orders', label: 'Đơn hàng', icon: <ClipboardDocumentListIcon className="w-5 h-5" /> },
  { to: '/admin/users', label: 'Người dùng', icon: <UsersIcon className="w-5 h-5" /> },
  { to: '/admin/vouchers', label: 'Voucher', icon: <TicketIcon className="w-5 h-5" /> },
  { to: '/admin/reviews', label: 'Đánh giá', icon: <ChatBubbleLeftRightIcon className="w-5 h-5" /> },
  { to: '/admin/roles', label: 'Vai trò', icon: <KeyIcon className="w-5 h-5" /> },
];

const AdminSidebar = () => {
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useTheme();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    // TODO: Thực hiện logout thực tế nếu có
    alert('Đăng xuất thành công!');
    window.location.href = '/auth';
  };

  return (
    <aside className="bg-gray-900 text-white w-56 min-h-screen flex flex-col py-6 px-4">
      <div className="mb-8 font-bold text-xl flex items-center gap-2">
        <span className="bg-blue-500 px-2 py-1 rounded">Admin</span>
        <span>Panel</span>
      </div>

      {/* Phần xin chào */}
      <div className="mb-6 p-4 bg-gray-800 rounded-lg">
        <div className="flex items-center gap-3">
          <UserCircleIcon className="w-10 h-10 text-blue-400" />
          <div>
            <p className="text-sm text-gray-400">Xin chào,</p>
            <p className="font-semibold text-white">{user?.name || 'Admin'}</p>
            <p className="text-xs text-gray-400">ID: {user?._id || 'ADMIN001'}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 flex flex-col gap-2">
        {menu.map(item => (
          <Link
            key={item.to}
            to={item.to}
            className={`flex items-center gap-3 px-3 py-2 rounded transition 
              ${location.pathname === item.to ? 'bg-blue-600 text-white font-semibold' : 'hover:bg-gray-800'}`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="flex flex-col gap-2 mt-8">
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-800 transition"
        >
          {isDarkMode ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
          <span>{isDarkMode ? 'Chế độ sáng' : 'Chế độ tối'}</span>
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-800 transition text-red-300"
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5" />
          <span>Đăng xuất</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar; 