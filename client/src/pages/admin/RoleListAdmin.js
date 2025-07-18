import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { PencilSquareIcon, TrashIcon, PlusIcon, XCircleIcon } from '@heroicons/react/24/outline';
import Toast from '../../components/Toast';
import Loading from '../../components/Loading';
import ConfirmDialog from '../../components/ConfirmDialog';

// Mock quyền hệ thống
const allPermissions = [
    'product.read', 'product.create', 'product.update', 'product.delete',
    'order.read', 'order.update', 'order.delete',
    'user.read', 'user.update', 'user.delete',
    'review.read', 'review.approve', 'review.delete',
    'voucher.read', 'voucher.create', 'voucher.update', 'voucher.delete',
];

// Mock data role
const mockRoles = [
    { _id: '1', name: 'admin', permissions: allPermissions },
    { _id: '2', name: 'user', permissions: ['product.read', 'order.read', 'review.read'] },
];

const RoleListAdmin = () => {
    const { isDarkMode } = useTheme();
    const [roles, setRoles] = useState(mockRoles);
    const [showForm, setShowForm] = useState(false);
    const [editRole, setEditRole] = useState(null);
    const [form, setForm] = useState({ name: '', permissions: [] });
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);

    const handleOpenForm = (role = null) => {
        setEditRole(role);
        setForm(role ? { name: role.name, permissions: role.permissions } : { name: '', permissions: [] });
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setEditRole(null);
        setForm({ name: '', permissions: [] });
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handlePermissionChange = (perm) => {
        setForm({
            ...form,
            permissions: form.permissions.includes(perm)
                ? form.permissions.filter(p => p !== perm)
                : [...form.permissions, perm]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // TODO: Gọi API thực tế ở đây
            await new Promise(resolve => setTimeout(resolve, 1000)); // Giả lập API call

            if (editRole) {
                setRoles(roles.map(r => r._id === editRole._id ? { ...r, ...form } : r));
                setToast({ type: 'success', message: 'Cập nhật vai trò thành công!' });
            } else {
                setRoles([...roles, { _id: Date.now().toString(), ...form }]);
                setToast({ type: 'success', message: 'Thêm vai trò mới thành công!' });
            }
            handleCloseForm();
        } catch (error) {
            setToast({ type: 'error', message: 'Có lỗi xảy ra. Vui lòng thử lại!' });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            // TODO: Gọi API thực tế ở đây
            await new Promise(resolve => setTimeout(resolve, 1000)); // Giả lập API call
            setRoles(roles.filter(r => r._id !== id));
            setToast({ type: 'success', message: 'Xóa vai trò thành công!' });
        } catch (error) {
            setToast({ type: 'error', message: 'Có lỗi xảy ra. Vui lòng thử lại!' });
        } finally {
            setLoading(false);
            setConfirmDelete(null);
        }
    };

    return (
        <div className={`min-h-screen p-6 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Quản lý vai trò & phân quyền</h1>
                    <button
                        onClick={() => handleOpenForm()}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                    >
                        <PlusIcon className="w-5 h-5" /> Thêm vai trò
                    </button>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className={isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Tên vai trò</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Quyền</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Hành động</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {roles.map(role => (
                                    <tr key={role._id} className={isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
                                        <td className="px-6 py-4 whitespace-nowrap font-medium">{role.name}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-wrap gap-1">
                                                {role.permissions.map(p => (
                                                    <span key={p} className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded text-xs font-medium">
                                                        {p}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleOpenForm(role)}
                                                    className="p-2 text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded-lg transition"
                                                    title="Sửa"
                                                >
                                                    <PencilSquareIcon className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => setConfirmDelete(role)}
                                                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                                                    title="Xóa"
                                                >
                                                    <TrashIcon className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {roles.length === 0 && (
                                    <tr>
                                        <td colSpan="3" className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                                            Không có vai trò nào.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Form thêm/sửa role */}
                {showForm && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-lg mx-4 animate-scale-in">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold">{editRole ? 'Sửa vai trò' : 'Thêm vai trò mới'}</h2>
                                <button
                                    type="button"
                                    onClick={handleCloseForm}
                                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                >
                                    <XCircleIcon className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Tên vai trò</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                                        placeholder="Nhập tên vai trò..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Chọn quyền</label>
                                    <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto p-2 border rounded-lg dark:border-gray-600">
                                        {allPermissions.map(p => (
                                            <label key={p} className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={form.permissions.includes(p)}
                                                    onChange={() => handlePermissionChange(p)}
                                                    className="rounded text-blue-500 focus:ring-blue-500"
                                                />
                                                <span className="text-sm">{p}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={handleCloseForm}
                                    className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Đang xử lý...' : (editRole ? 'Cập nhật' : 'Thêm mới')}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Loading */}
                {loading && <Loading fullScreen />}

                {/* Toast */}
                {toast && (
                    <Toast
                        type={toast.type}
                        message={toast.message}
                        onClose={() => setToast(null)}
                    />
                )}

                {/* Confirm Delete */}
                <ConfirmDialog
                    isOpen={!!confirmDelete}
                    onClose={() => setConfirmDelete(null)}
                    onConfirm={() => handleDelete(confirmDelete._id)}
                    title="Xác nhận xóa"
                    message={`Bạn có chắc chắn muốn xóa vai trò "${confirmDelete?.name}"?`}
                    confirmText="Xóa"
                    cancelText="Hủy"
                />
            </div>
        </div>
    );
};

export default RoleListAdmin; 