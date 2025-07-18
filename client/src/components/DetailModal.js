import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const DetailModal = ({ open, title, type, data, onClose }) => {
  if (!open) return null;

  if (!data) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-2xl animate-fade-in relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-white transition"
            aria-label="Đóng"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{title}</h2>
          <div className="text-gray-700 dark:text-gray-200 text-center py-8">
            Đang tải dữ liệu...
          </div>
        </div>
      </div>
    );
  }

  const renderProductDetails = () => {
    if (!data) return null;
    return (
      <div className="space-y-4">
        <div className="flex gap-4">
          <img 
            src={data.image} 
            alt={data.name} 
            className="w-32 h-32 object-cover rounded-lg shadow-md"
          />
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">{data.name}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-2">{data.description}</p>
            <div className="flex gap-2">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded text-sm">
                {data.brand}
              </span>
              <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded text-sm">
                {data.category}
              </span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold mb-2">Thông tin cơ bản</h4>
            <div className="space-y-2">
              <p><span className="font-medium">Giá:</span> {data.price?.toLocaleString()}₫</p>
              <p><span className="font-medium">Trạng thái:</span> 
                <span className={`ml-2 px-2 py-1 rounded text-sm ${data.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'}`}>
                  {data.status === 'active' ? 'Đang bán' : 'Ngừng bán'}
                </span>
              </p>
              {data.discount > 0 && (
                <p><span className="font-medium">Giảm giá:</span> {data.discount}%</p>
              )}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Thông tin chi tiết</h4>
            <div className="space-y-2">
              {data.sizes && (
                <div>
                  <span className="font-medium">Kích thước:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {data.sizes.map((size, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">
                        {size.size} ({size.stock})
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {data.colors && (
                <div>
                  <span className="font-medium">Màu sắc:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {data.colors.map((color, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">
                        {color.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {data.features && data.features.length > 0 && (
          <div>
            <h4 className="font-semibold mb-2">Tính năng</h4>
            <ul className="list-disc list-inside space-y-1">
              {data.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  const renderUserDetails = () => {
    if (!data) return null;
    return (
      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            {data.avatar ? (
              <img 
                src={data.avatar} 
                alt={data.name} 
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <span className="text-4xl text-gray-500 dark:text-gray-400">
                {data.name?.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">{data.name}</h3>
            <p className="text-gray-600 dark:text-gray-300">{data.email}</p>
            <div className="flex gap-2 mt-2">
              <span className={`px-2 py-1 rounded text-sm ${
                data.role === 'admin' 
                  ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                  : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
              }`}>
                {data.role === 'admin' ? 'Admin' : 'User'}
              </span>
              <span className={`px-2 py-1 rounded text-sm ${
                data.status === 'active'
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
              }`}>
                {data.status === 'active' ? 'Hoạt động' : 'Khóa'}
              </span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold mb-2">Thông tin cá nhân</h4>
            <div className="space-y-2">
              <p><span className="font-medium">Số điện thoại:</span> {data.phone || 'Chưa cập nhật'}</p>
              <p><span className="font-medium">Địa chỉ:</span> {data.address || 'Chưa cập nhật'}</p>
              <p><span className="font-medium">Ngày tham gia:</span> {new Date(data.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Thống kê</h4>
            <div className="space-y-2">
              <p><span className="font-medium">Số đơn hàng:</span> {data.orderCount || 0}</p>
              <p><span className="font-medium">Tổng chi tiêu:</span> {(data.totalSpent || 0).toLocaleString()}₫</p>
              <p><span className="font-medium">Đánh giá:</span> {data.reviewCount || 0}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-2xl animate-fade-in relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-white transition"
          aria-label="Đóng"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{title}</h2>
        <div className="text-gray-700 dark:text-gray-200">
          {type === 'product' ? renderProductDetails() : renderUserDetails()}
        </div>
      </div>
    </div>
  );
};

export default DetailModal; 