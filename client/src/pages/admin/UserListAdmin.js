import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Toast from '../../components/Toast';
import ConfirmModal from '../../components/ConfirmModal';
import DetailModal from '../../components/DetailModal';

const mockUsers = [
  {
    _id: '1',
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    role: 'admin',
    status: 'active',
    phone: '0901234567',
    address: 'Hà Nội',
    createdAt: '2024-01-01',
    orderCount: 5,
    totalSpent: 15000000,
    reviewCount: 3
  },
  {
    _id: '2',
    name: 'Trần Thị B',
    email: 'tranthib@example.com',
    role: 'user',
    status: 'active',
    phone: '0902345678',
    address: 'TP.HCM',
    createdAt: '2024-02-01',
    orderCount: 3,
    totalSpent: 8000000,
    reviewCount: 2
  },
  {
    _id: '3',
    name: 'Lê Văn C',
    email: 'levanc@example.com',
    role: 'user',
    status: 'inactive',
    phone: '0903456789',
    address: 'Đà Nẵng',
    createdAt: '2024-03-01',
    orderCount: 0,
    totalSpent: 0,
    reviewCount: 0
  }
];

const UserListAdmin = () => {
  const { isDarkMode } = useTheme();
  const [users, setUsers] = useState(mockUsers);
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('All');
  const [status, setStatus] = useState('All');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [toast, setToast] = useState(null);

  const filteredUsers = users.filter(user => {
    const matchRole = role === 'All' || user.role === role;
    const matchStatus = status === 'All' || user.status === status;
    const matchSearch = user.name.toLowerCase().includes(search.toLowerCase()) || 
                       user.email.toLowerCase().includes(search.toLowerCase());
    const matchDate = (!dateRange.from || user.createdAt >= dateRange.from) && 
                     (!dateRange.to || user.createdAt <= dateRange.to);
    return matchRole && matchStatus && matchSearch && matchDate;
  });

  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const handleShowDetail = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const handleDelete = (id) => {
    setUsers(users.filter(u => u._id !== id));
    setToast({ type: 'success', message: 'Đã xóa người dùng thành công!' });
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    setCurrentPage(1);
  };

  const handleDateChange = (e) => {
    setDateRange({ ...dateRange, [e.target.name]: e.target.value });
    setCurrentPage(1);
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className={`p-6 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} min-h-screen`}>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Quản lý người dùng</h1>
        {/* Advanced Filter UI */}
        <div className={`rounded-xl shadow-sm p-4 mb-4 flex flex-wrap gap-3 items-center bg-white/80 dark:bg-gray-800/80`}>
          <div className="relative w-full md:w-1/4">
            <input
              type="text"
              placeholder="Tìm kiếm theo tên hoặc email..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className={`h-10 w-full pl-10 pr-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition bg-white dark:bg-gray-900 ${isDarkMode ? 'border-gray-700 text-white' : 'border-gray-300 text-gray-900'}`}
            />
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          <select value={role} onChange={handleRoleChange} className="h-10 px-3 rounded-lg border bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition text-gray-900 dark:text-white border-gray-300 dark:border-gray-700">
            <option value="All">Tất cả quyền</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          <select value={status} onChange={handleStatusChange} className="h-10 px-3 rounded-lg border bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition text-gray-900 dark:text-white border-gray-300 dark:border-gray-700">
            <option value="All">Tất cả trạng thái</option>
            <option value="active">Hoạt động</option>
            <option value="inactive">Khóa</option>
          </select>
          <div className="flex items-center gap-1">
            <span className="text-sm">Ngày tạo:</span>
            <input
              type="date"
              name="from"
              value={dateRange.from}
              onChange={handleDateChange}
              className="h-10 p-1 border rounded-lg text-sm bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
            />
            <span>-</span>
            <input
              type="date"
              name="to"
              value={dateRange.to}
              onChange={handleDateChange}
              className="h-10 p-1 border rounded-lg text-sm bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
            />
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-sm">Rows per page:</span>
            <select value={rowsPerPage} onChange={handleRowsPerPageChange} className="h-10 px-2 rounded-lg border bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition">
              {[10, 20, 50].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className={`min-w-full ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md rounded-lg`}>
            <thead>
              <tr className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <th className="py-2 px-4 text-left">ID</th>
                <th className="py-2 px-4 text-left">Tên</th>
                <th className="py-2 px-4 text-left">Email</th>
                <th className="py-2 px-4 text-left">Quyền</th>
                <th className="py-2 px-4 text-left">Trạng thái</th>
                <th className="py-2 px-4 text-left">Ngày tạo</th>
                <th className="py-2 px-4 text-left">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map(user => (
                <tr key={user._id} className={`border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} hover:bg-blue-50 dark:hover:bg-gray-700`}>
                  <td className="py-2 px-4">{user._id}</td>
                  <td className="py-2 px-4">{user.name}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4">
                    <span className={`px-2 py-1 rounded text-sm ${
                      user.role === 'admin' 
                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    }`}>
                      {user.role === 'admin' ? 'Admin' : 'User'}
                    </span>
                  </td>
                  <td className="py-2 px-4">
                    <span className={`px-2 py-1 rounded text-sm ${
                      user.status === 'active'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {user.status === 'active' ? 'Hoạt động' : 'Khóa'}
                    </span>
                  </td>
                  <td className="py-2 px-4">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="py-2 px-4 flex gap-2">
                    <button onClick={() => handleShowDetail(user)} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition">Chi tiết</button>
                    <button onClick={() => handleDelete(user._id)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition">Xóa</button>
                  </td>
                </tr>
              ))}
              {paginatedUsers.length === 0 && (
                <tr><td colSpan="7" className="text-center py-8 text-gray-400">Không có người dùng nào.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded border ${currentPage === i + 1 ? 'bg-blue-500 text-white border-blue-500' : isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-200' : 'bg-white border-gray-300 text-gray-700'} hover:bg-blue-400 hover:text-white`}
            >
              {i + 1}
            </button>
          ))}
        </div>
        {/* Detail Modal */}
        <DetailModal
          open={showModal && selectedUser}
          title="Chi tiết người dùng"
          type="user"
          data={selectedUser}
          onClose={handleCloseModal}
        />
        {toast && (
          <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />
        )}
      </div>
    </div>
  );
};

export default UserListAdmin; 