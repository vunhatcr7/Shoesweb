import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { MagnifyingGlassIcon, PencilSquareIcon, TrashIcon, PlusIcon, EyeIcon, XCircleIcon } from '@heroicons/react/24/outline';
import Toast from '../../components/Toast';
import Loading from '../../components/Loading';
import ConfirmDialog from '../../components/ConfirmDialog';

const mockProducts = [
  {
    _id: '1',
    name: 'Nike Air Max 97',
    price: 3500000,
    category: 'Sneaker',
    image: 'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,q_auto:eco/air-max-97.jpg',
    status: 'active',
    brand: 'Nike',
  },
  {
    _id: '2',
    name: 'Nike Air Force 1',
    price: 2800000,
    category: 'Sneaker',
    image: 'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,q_auto:eco/air-force-1.jpg',
    status: 'inactive',
    brand: 'Nike',
  },
  {
    _id: '3',
    name: 'Adidas Ultraboost',
    price: 4200000,
    category: 'Running',
    image: 'https://assets.adidas.com/images/w_600,f_auto,q_auto/ultraboost.jpg',
    status: 'active',
    brand: 'Adidas',
  },
  {
    _id: '4',
    name: 'Puma Suede Classic',
    price: 2100000,
    category: 'Classic',
    image: 'https://images.puma.com/puma-suede.jpg',
    status: 'active',
    brand: 'Puma',
  },
  // ... thêm sản phẩm mẫu nếu muốn
];

const categories = ['All', 'Sneaker', 'Running', 'Classic'];
const brands = ['All', 'Nike', 'Adidas', 'Puma', 'Converse', 'New Balance', 'Vans', 'Reebok', 'Asics', 'Mizuno', 'Li-Ning'];
const statusList = ['All', 'active', 'inactive'];

const ProductListAdmin = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [products, setProducts] = useState(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  useEffect(() => {
    setProducts(mockProducts);
  }, []);

  // Lọc sản phẩm nâng cao
  const filteredProducts = products.filter(product => {
    const matchName = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchBrand = selectedBrand === 'All' || product.brand === selectedBrand;
    const matchStatus = selectedStatus === 'All' || product.status === selectedStatus;
    const matchPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchName && matchCategory && matchBrand && matchStatus && matchPrice;
  });

  // Phân trang
  const totalPages = Math.ceil(filteredProducts.length / rowsPerPage);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const handleEdit = (id) => {
    navigate(`/admin/products/${id}/edit`);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      // TODO: Gọi API thực tế ở đây
      await new Promise(resolve => setTimeout(resolve, 1000)); // Giả lập API call
      setProducts(products.filter(p => p._id !== id));
      setToast({ type: 'success', message: 'Xóa sản phẩm thành công!' });
    } catch (error) {
      setToast({ type: 'error', message: 'Có lỗi xảy ra. Vui lòng thử lại!' });
    } finally {
      setLoading(false);
      setConfirmDelete(null);
    }
  };

  const handleShowDetail = (product) => {
    setSelectedProduct(product);
    setShowDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setSelectedProduct(null);
  };

  return (
    <div className={`min-h-screen p-6 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold">Quản lý sản phẩm</h1>
          <button
            onClick={() => navigate('/admin/products/new')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            <PlusIcon className="w-5 h-5" /> Thêm sản phẩm mới
          </button>
        </div>

        {/* Advanced Filter UI */}
        <div className={`rounded-xl shadow-sm p-4 mb-6 flex flex-wrap gap-3 items-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm`}>
          <div className="relative w-full md:w-1/4">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`h-10 w-full pl-10 pr-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition bg-white dark:bg-gray-900 ${isDarkMode ? 'border-gray-700 text-white' : 'border-gray-300 text-gray-900'}`}
            />
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="h-10 px-3 rounded-lg border bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition text-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
          >
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>

          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="h-10 px-3 rounded-lg border bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition text-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
          >
            {brands.map(brand => <option key={brand} value={brand}>{brand}</option>)}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="h-10 px-3 rounded-lg border bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition text-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
          >
            {statusList.map(status => <option key={status} value={status}>{status}</option>)}
          </select>

          <div className="flex items-center gap-2">
            <span className="text-sm">Giá:</span>
            <input
              type="number"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
              className="h-10 w-24 px-2 rounded-lg border bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition text-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
              placeholder="Min"
            />
            <span>-</span>
            <input
              type="number"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="h-10 w-24 px-2 rounded-lg border bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition text-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
              placeholder="Max"
            />
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className={isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Sản phẩm</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Danh mục</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Thương hiệu</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Giá</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Trạng thái</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {paginatedProducts.map(product => (
                  <tr key={product._id} className={isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover" />
                        <span className="font-medium">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{product.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{product.brand}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{product.price.toLocaleString()}₫</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${product.status === 'active'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}>
                        {product.status === 'active' ? 'Đang bán' : 'Ngừng bán'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleShowDetail(product)}
                          className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition"
                          title="Xem chi tiết"
                        >
                          <EyeIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleEdit(product._id)}
                          className="p-2 text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded-lg transition"
                          title="Sửa"
                        >
                          <PencilSquareIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => setConfirmDelete(product)}
                          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                          title="Xóa"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {paginatedProducts.length === 0 && (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                      Không tìm thấy sản phẩm nào.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center gap-2">
              <span className="text-sm">Hiển thị:</span>
              <select
                value={rowsPerPage}
                onChange={(e) => setRowsPerPage(Number(e.target.value))}
                className="h-8 px-2 rounded-lg border bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
              >
                {[10, 20, 50].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-lg ${currentPage === page
                    ? 'bg-blue-500 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                >
                  {page}
                </button>
              ))}
            </div>
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
          message={`Bạn có chắc chắn muốn xóa sản phẩm "${confirmDelete?.name}"?`}
          confirmText="Xóa"
          cancelText="Hủy"
        />

        {/* Detail Modal */}
        {showDetailModal && selectedProduct && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-2xl w-full mx-4 animate-scale-in">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Chi tiết sản phẩm</h2>
                <button
                  onClick={handleCloseDetailModal}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <XCircleIcon className="w-6 h-6" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full rounded-lg" />
                </div>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-lg font-semibold">{selectedProduct.name}</h3>
                    <p className="text-gray-500 dark:text-gray-400">{selectedProduct.brand}</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-500">{selectedProduct.price.toLocaleString()}₫</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Danh mục: {selectedProduct.category}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Trạng thái: {
                      selectedProduct.status === 'active' ? 'Đang bán' : 'Ngừng bán'
                    }</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListAdmin; 