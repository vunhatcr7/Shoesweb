import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline';
import Toast from '../../components/Toast';
import ConfirmModal from '../../components/ConfirmModal';
import DetailModal from '../../components/DetailModal';

const mockVouchers = [
    {
        _id: '1',
        code: 'SUMMER2024',
        name: 'Giảm giá mùa hè',
        description: 'Giảm giá cho tất cả sản phẩm mùa hè',
        type: 'percentage',
        value: 20,
        minOrderValue: 1000000,
        maxDiscount: 500000,
        startDate: '2024-06-01',
        endDate: '2024-08-31',
        usageLimit: 100,
        usedCount: 45,
        status: 'active',
        applicableCategories: ['Sneaker', 'Running'],
    },
    {
        _id: '2',
        code: 'WELCOME50K',
        name: 'Chào mừng thành viên mới',
        description: 'Giảm giá 50k cho đơn hàng đầu tiên',
        type: 'fixed',
        value: 50000,
        minOrderValue: 200000,
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        usageLimit: 1,
        usedCount: 0,
        status: 'active',
        applicableCategories: ['All'],
    },
];

const VoucherListAdmin = () => {
    const navigate = useNavigate();
    const { isDarkMode } = useTheme();
    const [vouchers, setVouchers] = useState(mockVouchers);
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('all');
    const [dateRange, setDateRange] = useState({ from: '', to: '' });
    const [selectedVoucher, setSelectedVoucher] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [toast, setToast] = useState(null);

    const filteredVouchers = vouchers.filter(voucher => {
        const matchStatus = status === 'all' || voucher.status === status;
        const matchSearch = voucher.code.toLowerCase().includes(search.toLowerCase()) ||
            voucher.name.toLowerCase().includes(search.toLowerCase());
        const matchDate = (!dateRange.from || voucher.startDate >= dateRange.from) &&
            (!dateRange.to || voucher.endDate <= dateRange.to);
        return matchStatus && matchSearch && matchDate;
    });

    const handleDelete = (id) => {
        setSelectedVoucher({ ...vouchers.find(v => v._id === id), _delete: true });
        setShowModal(true);
    };

    const handleConfirmDelete = () => {
        setVouchers(vouchers.filter(v => v._id !== selectedVoucher._id));
        setShowModal(false);
        setToast({ type: 'success', message: 'Voucher đã được xóa!' });
    };

    const handleShowDetail = (voucher) => {
        setSelectedVoucher(voucher);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedVoucher(null);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'active':
                return 'bg-green-100 text-green-800';
            case 'inactive':
                return 'bg-gray-100 text-gray-800';
            case 'expired':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className={`min-h-screen p-6 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Quản lý Voucher</h1>
                    <button
                        onClick={() => navigate('/admin/vouchers/new')}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                        <PlusIcon className="w-5 h-5" />
                        <span>Thêm Voucher</span>
                    </button>
                </div>

                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Tìm kiếm..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className={`w-full pl-10 pr-4 py-2 rounded border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
                                }`}
                        />
                        <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
                    </div>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className={`p-2 rounded border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
                            }`}
                    >
                        <option value="all">Tất cả trạng thái</option>
                        <option value="active">Đang hoạt động</option>
                        <option value="inactive">Không hoạt động</option>
                        <option value="expired">Hết hạn</option>
                    </select>
                    <input
                        type="date"
                        value={dateRange.from}
                        onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                        className={`p-2 rounded border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
                            }`}
                    />
                    <input
                        type="date"
                        value={dateRange.to}
                        onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                        className={`p-2 rounded border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
                            }`}
                    />
                </div>

                {/* Voucher List */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Mã</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Tên</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Giá trị</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Thời hạn</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Trạng thái</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Sử dụng</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className={`divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                            {filteredVouchers.map(voucher => (
                                <tr key={voucher._id} className={`${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                                    <td className="px-6 py-4 whitespace-nowrap font-medium">{voucher.code}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{voucher.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {voucher.type === 'percentage' ? `${voucher.value}%` : `${voucher.value.toLocaleString()}₫`}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {new Date(voucher.startDate).toLocaleDateString()} - {new Date(voucher.endDate).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(voucher.status)}`}>
                                            {voucher.status === 'active' ? 'Đang hoạt động' :
                                                voucher.status === 'inactive' ? 'Không hoạt động' : 'Hết hạn'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {voucher.usedCount}/{voucher.usageLimit || '∞'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleShowDetail(voucher)}
                                                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                                            >
                                                Chi tiết
                                            </button>
                                            <button
                                                onClick={() => navigate(`/admin/vouchers/edit/${voucher._id}`)}
                                                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                                            >
                                                Sửa
                                            </button>
                                            <button
                                                onClick={() => handleDelete(voucher._id)}
                                                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                                            >
                                                Xóa
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Modals */}
                <DetailModal
                    open={showModal && selectedVoucher && !selectedVoucher._delete}
                    title="Chi tiết Voucher"
                    onClose={handleCloseModal}
                >
                    {selectedVoucher && (
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold">Thông tin cơ bản</h3>
                                <p>Mã: {selectedVoucher.code}</p>
                                <p>Tên: {selectedVoucher.name}</p>
                                <p>Mô tả: {selectedVoucher.description}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Thông tin giảm giá</h3>
                                <p>Loại: {selectedVoucher.type === 'percentage' ? 'Phần trăm' : 'Cố định'}</p>
                                <p>Giá trị: {selectedVoucher.type === 'percentage' ? `${selectedVoucher.value}%` : `${selectedVoucher.value.toLocaleString()}₫`}</p>
                                <p>Giá trị đơn hàng tối thiểu: {selectedVoucher.minOrderValue.toLocaleString()}₫</p>
                                {selectedVoucher.maxDiscount && (
                                    <p>Giảm giá tối đa: {selectedVoucher.maxDiscount.toLocaleString()}₫</p>
                                )}
                            </div>
                            <div>
                                <h3 className="font-semibold">Thời gian và giới hạn</h3>
                                <p>Ngày bắt đầu: {new Date(selectedVoucher.startDate).toLocaleDateString()}</p>
                                <p>Ngày kết thúc: {new Date(selectedVoucher.endDate).toLocaleDateString()}</p>
                                <p>Giới hạn sử dụng: {selectedVoucher.usageLimit || 'Không giới hạn'}</p>
                                <p>Đã sử dụng: {selectedVoucher.usedCount}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Danh mục áp dụng</h3>
                                <p>{selectedVoucher.applicableCategories.join(', ')}</p>
                            </div>
                        </div>
                    )}
                </DetailModal>

                <ConfirmModal
                    open={showModal && selectedVoucher?._delete}
                    title="Xác nhận xóa"
                    message="Bạn có chắc chắn muốn xóa voucher này?"
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCloseModal}
                />

                {toast && (
                    <Toast
                        type={toast.type}
                        message={toast.message}
                        onClose={() => setToast(null)}
                    />
                )}
            </div>
        </div>
    );
};

export default VoucherListAdmin; 