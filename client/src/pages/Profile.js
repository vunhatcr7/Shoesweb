import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { PencilSquareIcon, EyeIcon, BanknotesIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';

// Mock user and orders data
const mockUser = {
  name: 'Nguyen Van A',
  email: 'nguyenvana@example.com',
  phone: '0123456789',
  address: '123 Đường ABC, Quận 1, TP.HCM',
};

const mockOrders = [
  {
    id: 'ORD001',
    date: '2024-06-01',
    total: 2500000,
    status: 'Delivered',
    items: 2,
  },
  {
    id: 'ORD002',
    date: '2024-05-20',
    total: 1800000,
    status: 'Shipping',
    items: 1,
  },
  {
    id: 'ORD003',
    date: '2024-05-10',
    total: 3200000,
    status: 'Cancelled',
    items: 3,
  },
];

const Profile = () => {
  const { isDarkMode } = useTheme();
  const [user] = useState(mockUser);
  const [orders] = useState(mockOrders);

  // Tổng tiền đã chi (tính cả đơn đã giao và đang giao)
  const totalSpent = orders.reduce((sum, o) => sum + o.total, 0);

  // Tổng chi trong tháng hiện tại
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();
  const totalSpentThisMonth = orders
    .filter(o => {
      const d = new Date(o.date);
      return d.getMonth() + 1 === currentMonth && d.getFullYear() === currentYear;
    })
    .reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4">
        {/* Personal Info */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6 transition-colors duration-300">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Personal Information</h2>
            <div className="text-gray-700 dark:text-gray-300 mb-1"><span className="font-semibold">Name:</span> {user.name}</div>
            <div className="text-gray-700 dark:text-gray-300 mb-1"><span className="font-semibold">Email:</span> {user.email}</div>
            <div className="text-gray-700 dark:text-gray-300 mb-1"><span className="font-semibold">Phone:</span> {user.phone}</div>
            <div className="text-gray-700 dark:text-gray-300"><span className="font-semibold">Address:</span> {user.address}</div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-semibold transition-all duration-300 shadow-md">
            <PencilSquareIcon className="h-5 w-5" /> Edit
          </button>
        </div>

        {/* Order Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center transition-colors duration-300">
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">{orders.length}</div>
            <div className="text-gray-700 dark:text-gray-300 mt-2">Total Orders</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center transition-colors duration-300">
            <BanknotesIcon className="h-7 w-7 mb-1 text-green-500" />
            <div className="text-xl font-bold text-green-600 dark:text-green-400">{totalSpent.toLocaleString()}₫</div>
            <div className="text-gray-700 dark:text-gray-300 mt-2 text-center">Total Spent</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center transition-colors duration-300">
            <CalendarDaysIcon className="h-7 w-7 mb-1 text-blue-500" />
            <div className="text-xl font-bold text-blue-600 dark:text-blue-400">{totalSpentThisMonth.toLocaleString()}₫</div>
            <div className="text-gray-700 dark:text-gray-300 mt-2 text-center">Spent This Month</div>
          </div>
        </div>

        {/* Orders List */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 transition-colors duration-300">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Order History</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Order ID</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Date</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Items</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Total</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Status</th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id} className="hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors">
                    <td className="px-4 py-2 text-gray-900 dark:text-white font-mono">{order.id}</td>
                    <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{order.date}</td>
                    <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{order.items}</td>
                    <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{order.total.toLocaleString()}₫</td>
                    <td className="px-4 py-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold 
                        ${order.status === 'Delivered' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : ''}
                        ${order.status === 'Shipping' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' : ''}
                        ${order.status === 'Cancelled' ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' : ''}
                      `}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <button className="flex items-center gap-1 text-primary-600 dark:text-primary-400 hover:underline">
                        <EyeIcon className="h-5 w-5" /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 