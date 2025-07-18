import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const mockStats = {
  products: 25,
  orders: 120,
  users: 58,
  revenue: 125000000,
};

const mockOrders = [
  { id: 'OD001', customer: 'Nguyễn Văn A', total: 2500000, status: 'Đã giao', date: '2024-06-01' },
  { id: 'OD002', customer: 'Trần Thị B', total: 1800000, status: 'Đang xử lý', date: '2024-06-02' },
  { id: 'OD003', customer: 'Lê Văn C', total: 3200000, status: 'Đã giao', date: '2024-06-02' },
  { id: 'OD004', customer: 'Phạm Thị D', total: 1500000, status: 'Đã hủy', date: '2024-06-03' },
];

const revenueData = {
  labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'],
  datasets: [
    {
      label: 'Doanh thu (VNĐ)',
      data: [20000000, 25000000, 18000000, 30000000, 22000000, 12500000],
      backgroundColor: '#3b82f6',
      borderRadius: 6,
    },
  ],
};

const AdminDashboard = () => {
  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Dashboard tổng quan</h1>
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col items-center">
            <span className="text-gray-500 text-sm">Sản phẩm</span>
            <span className="text-2xl font-bold text-blue-500">{mockStats.products}</span>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col items-center">
            <span className="text-gray-500 text-sm">Đơn hàng</span>
            <span className="text-2xl font-bold text-green-500">{mockStats.orders}</span>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col items-center">
            <span className="text-gray-500 text-sm">Người dùng</span>
            <span className="text-2xl font-bold text-yellow-500">{mockStats.users}</span>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col items-center">
            <span className="text-gray-500 text-sm">Doanh thu</span>
            <span className="text-2xl font-bold text-red-500">{mockStats.revenue.toLocaleString()}₫</span>
          </div>
        </div>
        {/* Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Biểu đồ doanh thu 6 tháng gần nhất</h2>
          <Bar data={revenueData} options={{
            responsive: true,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true } },
          }} />
        </div>
        {/* Latest Orders */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Đơn hàng mới nhất</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="py-2 px-4 text-left">Mã đơn</th>
                  <th className="py-2 px-4 text-left">Khách hàng</th>
                  <th className="py-2 px-4 text-left">Tổng tiền</th>
                  <th className="py-2 px-4 text-left">Trạng thái</th>
                  <th className="py-2 px-4 text-left">Ngày</th>
                </tr>
              </thead>
              <tbody>
                {mockOrders.map((order) => (
                  <tr key={order.id} className="border-t border-gray-200 dark:border-gray-700">
                    <td className="py-2 px-4 font-medium">{order.id}</td>
                    <td className="py-2 px-4">{order.customer}</td>
                    <td className="py-2 px-4">{order.total.toLocaleString()}₫</td>
                    <td className="py-2 px-4">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${order.status === 'Đã giao' ? 'bg-green-100 text-green-700' : order.status === 'Đang xử lý' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{order.status}</span>
                    </td>
                    <td className="py-2 px-4">{order.date}</td>
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

export default AdminDashboard; 