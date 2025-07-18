import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Toast from '../../components/Toast';
import ConfirmModal from '../../components/ConfirmModal';
import DetailModal from '../../components/DetailModal';

const mockOrders = [
  { id: 'OD001', customer: 'Nguyễn Văn A', total: 2500000, status: 'Đã giao', date: '2024-06-01', address: 'Hà Nội', phone: '0901234567', voucher: 'SUMMER2024' },
  { id: 'OD002', customer: 'Trần Thị B', total: 1800000, status: 'Đang xử lý', date: '2024-06-02', address: 'TP.HCM', phone: '0902345678', voucher: '' },
  { id: 'OD003', customer: 'Lê Văn C', total: 3200000, status: 'Đã giao', date: '2024-06-02', address: 'Đà Nẵng', phone: '0903456789', voucher: 'WELCOME50K' },
  { id: 'OD004', customer: 'Phạm Thị D', total: 1500000, status: 'Đã hủy', date: '2024-06-03', address: 'Cần Thơ', phone: '0904567890', voucher: '' },
];

const statusList = ['Tất cả', 'Đang xử lý', 'Đã giao', 'Đã hủy'];

const OrderListAdmin = () => {
  const { isDarkMode } = useTheme();
  const [orders, setOrders] = useState(mockOrders);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('Tất cả');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [totalRange, setTotalRange] = useState({ min: '', max: '' });
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [toast, setToast] = useState(null);

  const filteredOrders = orders.filter(order => {
    const matchStatus = status === 'Tất cả' || order.status === status;
    const matchSearch = order.customer.toLowerCase().includes(search.toLowerCase()) || order.id.toLowerCase().includes(search.toLowerCase());
    const matchDate = (!dateRange.from || order.date >= dateRange.from) && (!dateRange.to || order.date <= dateRange.to);
    const matchTotal = (!totalRange.min || order.total >= Number(totalRange.min)) && (!totalRange.max || order.total <= Number(totalRange.max));
    return matchStatus && matchSearch && matchDate && matchTotal;
  });

  const totalPages = Math.ceil(filteredOrders.length / rowsPerPage);
  const paginatedOrders = filteredOrders.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const handleShowDetail = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn chắc chắn muốn xóa đơn hàng này?')) {
      setOrders(orders.filter(o => o.id !== id));
      setToast({ type: 'success', message: 'Đã xóa đơn hàng thành công!' });
    }
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    setCurrentPage(1);
  };

  const handleOrderStatusChange = (id, newStatus) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleDateChange = (e) => {
    setDateRange({ ...dateRange, [e.target.name]: e.target.value });
    setCurrentPage(1);
  };

  const handleTotalChange = (e) => {
    setTotalRange({ ...totalRange, [e.target.name]: e.target.value });
    setCurrentPage(1);
  };

  return (
    <div className={`p-6 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} min-h-screen`}>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Quản lý đơn hàng</h1>
        {/* Advanced Filter UI cải tiến */}
        <div className={`rounded-xl shadow-sm p-4 mb-4 flex flex-wrap gap-3 items-center bg-white/80 dark:bg-gray-800/80`}>
          <div className="relative w-full md:w-1/4">
            <input
              type="text"
              placeholder="Tìm kiếm theo tên hoặc mã đơn..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className={`h-10 w-full pl-10 pr-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition bg-white dark:bg-gray-900 ${isDarkMode ? 'border-gray-700 text-white' : 'border-gray-300 text-gray-900'}`}
            />
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          <select value={status} onChange={handleStatusChange} className="h-10 px-3 rounded-lg border bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition text-gray-900 dark:text-white border-gray-300 dark:border-gray-700">
            {statusList.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <div className="flex items-center gap-1">
            <span className="text-sm">Ngày:</span>
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
          <div className="flex items-center gap-1">
            <span className="text-sm">Tổng tiền:</span>
            <input
              type="number"
              name="min"
              min={0}
              value={totalRange.min}
              onChange={handleTotalChange}
              className="h-10 w-20 p-1 border rounded-lg text-sm bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              placeholder="Min"
            />
            <span>-</span>
            <input
              type="number"
              name="max"
              min={0}
              value={totalRange.max}
              onChange={handleTotalChange}
              className="h-10 w-20 p-1 border rounded-lg text-sm bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              placeholder="Max"
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
                <th className="py-2 px-4 text-left">Mã đơn</th>
                <th className="py-2 px-4 text-left">Khách hàng</th>
                <th className="py-2 px-4 text-left">Tổng tiền</th>
                <th className="py-2 px-4 text-left">Voucher</th>
                <th className="py-2 px-4 text-left">Trạng thái</th>
                <th className="py-2 px-4 text-left">Ngày</th>
                <th className="py-2 px-4 text-left">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.map(order => (
                <tr key={order.id} className={`border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} hover:bg-blue-50 dark:hover:bg-gray-700`}>
                  <td className="py-2 px-4 font-medium">{order.id}</td>
                  <td className="py-2 px-4">{order.customer}</td>
                  <td className="py-2 px-4">{order.total.toLocaleString()}₫</td>
                  <td className="py-2 px-4">{order.voucher ? <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold">{order.voucher}</span> : <span className="text-gray-400">-</span>}</td>
                  <td className="py-2 px-4">
                    <select
                      value={order.status}
                      onChange={e => handleOrderStatusChange(order.id, e.target.value)}
                      className="rounded px-2 py-1 border border-gray-300 text-sm bg-white text-gray-900"
                    >
                      <option>Đang xử lý</option>
                      <option>Đã giao</option>
                      <option>Đã hủy</option>
                    </select>
                  </td>
                  <td className="py-2 px-4">{order.date}</td>
                  <td className="py-2 px-4 flex gap-2">
                    <button onClick={() => handleShowDetail(order)} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition">Chi tiết</button>
                    <button onClick={() => { setSelectedOrder({ ...order, _delete: true }); setShowModal(true); }} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition">Xóa</button>
                  </td>
                </tr>
              ))}
              {paginatedOrders.length === 0 && (
                <tr><td colSpan="6" className="text-center py-8 text-gray-400">Không có đơn hàng nào.</td></tr>
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
        <DetailModal
          open={showModal && selectedOrder && !selectedOrder._delete}
          title="Chi tiết đơn hàng"
          onClose={handleCloseModal}
        >
          {selectedOrder && (
            <div className="space-y-2">
              <div><span className="font-semibold">Mã đơn:</span> {selectedOrder.id}</div>
              <div><span className="font-semibold">Khách hàng:</span> {selectedOrder.customer}</div>
              <div><span className="font-semibold">Số điện thoại:</span> {selectedOrder.phone}</div>
              <div><span className="font-semibold">Địa chỉ:</span> {selectedOrder.address}</div>
              <div><span className="font-semibold">Tổng tiền:</span> {selectedOrder.total.toLocaleString()}₫</div>
              <div><span className="font-semibold">Trạng thái:</span> {selectedOrder.status}</div>
              <div><span className="font-semibold">Ngày đặt:</span> {selectedOrder.date}</div>
            </div>
          )}
        </DetailModal>
        <ConfirmModal
          open={showModal && selectedOrder && selectedOrder._delete}
          title="Xác nhận xóa"
          message="Bạn chắc chắn muốn xóa đơn hàng này?"
          onConfirm={() => { handleDelete(selectedOrder.id); setShowModal(false); setSelectedOrder(null); }}
          onCancel={() => { setShowModal(false); setSelectedOrder(null); }}
        />
        {toast && (
          <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />
        )}
      </div>
    </div>
  );
};

export default OrderListAdmin; 