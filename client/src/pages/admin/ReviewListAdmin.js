import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { StarIcon, EyeIcon, EyeSlashIcon, TrashIcon } from '@heroicons/react/24/outline';

// Mock data
const mockReviews = [
    { _id: '1', product: { name: 'Nike Air Max 97' }, user: { name: 'Nguyễn Văn A', email: 'a@gmail.com' }, rating: 5, comment: 'Sản phẩm rất tốt!', status: 'approved', createdAt: '2024-06-01' },
    { _id: '2', product: { name: 'Adidas Ultraboost' }, user: { name: 'Trần Thị B', email: 'b@gmail.com' }, rating: 4, comment: 'Êm chân, giao hàng nhanh.', status: 'pending', createdAt: '2024-06-02' },
    { _id: '3', product: { name: 'Nike Air Max 97' }, user: { name: 'Lê Văn C', email: 'c@gmail.com' }, rating: 2, comment: 'Không như mong đợi.', status: 'hidden', createdAt: '2024-06-03' },
];

const statusList = ['Tất cả', 'pending', 'approved', 'hidden'];

const ReviewListAdmin = () => {
    const { isDarkMode } = useTheme();
    const [reviews, setReviews] = useState(mockReviews);
    const [status, setStatus] = useState('Tất cả');
    const [search, setSearch] = useState('');

    // Thống kê rating
    const ratingStats = [1, 2, 3, 4, 5].map(star => ({
        star,
        count: reviews.filter(r => r.rating === star && (status === 'Tất cả' || r.status === status)).length
    }));
    const total = ratingStats.reduce((sum, s) => sum + s.count, 0);
    const avg = total ? (ratingStats.reduce((sum, s) => sum + s.star * s.count, 0) / total).toFixed(2) : 0;

    const filteredReviews = reviews.filter(r =>
        (status === 'Tất cả' || r.status === status) &&
        (r.product.name.toLowerCase().includes(search.toLowerCase()) ||
            r.user.name.toLowerCase().includes(search.toLowerCase()) ||
            r.user.email.toLowerCase().includes(search.toLowerCase()) ||
            r.comment.toLowerCase().includes(search.toLowerCase()))
    );

    const handleApprove = (id) => {
        setReviews(reviews.map(r => r._id === id ? { ...r, status: 'approved' } : r));
    };
    const handleHide = (id) => {
        setReviews(reviews.map(r => r._id === id ? { ...r, status: 'hidden' } : r));
    };
    const handleDelete = (id) => {
        setReviews(reviews.filter(r => r._id !== id));
    };

    return (
        <div className={`min-h-screen p-6 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
            <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">Quản lý đánh giá sản phẩm</h1>
                {/* Thống kê rating */}
                <div className="flex flex-wrap gap-4 mb-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col items-center min-w-[120px]">
                        <span className="text-gray-500 text-sm">Trung bình</span>
                        <span className="text-2xl font-bold text-yellow-500 flex items-center gap-1">{avg} <StarIcon className="w-6 h-6 text-yellow-400" /></span>
                        <span className="text-xs text-gray-400">({total} đánh giá)</span>
                    </div>
                    {ratingStats.reverse().map(s => (
                        <div key={s.star} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col items-center min-w-[80px]">
                            <span className="font-bold text-lg text-yellow-500 flex items-center gap-1">{s.star} <StarIcon className="w-5 h-5 text-yellow-400" /></span>
                            <span className="text-sm">{s.count} đánh giá</span>
                        </div>
                    ))}
                </div>
                {/* Bộ lọc */}
                <div className="flex flex-wrap gap-4 mb-6 items-center">
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo sản phẩm, user, nội dung..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className={`p-2 rounded border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}
                    />
                    <select
                        value={status}
                        onChange={e => setStatus(e.target.value)}
                        className={`p-2 rounded border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}
                    >
                        {statusList.map(s => <option key={s} value={s}>{s === 'Tất cả' ? 'Tất cả trạng thái' : s}</option>)}
                    </select>
                </div>
                {/* Bảng review */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className={isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                            <tr>
                                <th className="px-4 py-3 text-left">Sản phẩm</th>
                                <th className="px-4 py-3 text-left">Người dùng</th>
                                <th className="px-4 py-3 text-left">Rating</th>
                                <th className="px-4 py-3 text-left">Nội dung</th>
                                <th className="px-4 py-3 text-left">Trạng thái</th>
                                <th className="px-4 py-3 text-left">Ngày</th>
                                <th className="px-4 py-3 text-left">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredReviews.map(r => (
                                <tr key={r._id} className={isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
                                    <td className="px-4 py-3 font-semibold">{r.product.name}</td>
                                    <td className="px-4 py-3">{r.user.name}<br /><span className="text-xs text-gray-400">{r.user.email}</span></td>
                                    <td className="px-4 py-3 flex items-center gap-1">{r.rating} <StarIcon className="w-4 h-4 text-yellow-400" /></td>
                                    <td className="px-4 py-3 max-w-xs truncate" title={r.comment}>{r.comment}</td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${r.status === 'approved' ? 'bg-green-100 text-green-800' : r.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-200 text-gray-700'}`}>{r.status}</span>
                                    </td>
                                    <td className="px-4 py-3">{r.createdAt}</td>
                                    <td className="px-4 py-3 flex gap-2">
                                        {r.status !== 'approved' && <button onClick={() => handleApprove(r._id)} className="p-1 bg-green-500 text-white rounded hover:bg-green-600" title="Duyệt"><EyeIcon className="w-5 h-5" /></button>}
                                        {r.status !== 'hidden' && <button onClick={() => handleHide(r._id)} className="p-1 bg-yellow-500 text-white rounded hover:bg-yellow-600" title="Ẩn"><EyeSlashIcon className="w-5 h-5" /></button>}
                                        <button onClick={() => handleDelete(r._id)} className="p-1 bg-red-500 text-white rounded hover:bg-red-600" title="Xóa"><TrashIcon className="w-5 h-5" /></button>
                                    </td>
                                </tr>
                            ))}
                            {filteredReviews.length === 0 && (
                                <tr><td colSpan="7" className="text-center py-8 text-gray-400">Không có đánh giá nào.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ReviewListAdmin; 