import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import ScrollToTop from '../components/ScrollToTop';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import AddToCartModal from '../components/AddToCartModal';
import { useNavigate } from 'react-router-dom';
import SelectVariantModal from '../components/SelectVariantModal';
import { useSearchParams } from 'react-router-dom';
import { Listbox, Transition } from '@headlessui/react';
import { Fragment } from 'react';

// Component banner lớn
const BannerCard = ({ banner }) => (
  <div className="bg-black dark:bg-gray-800 relative rounded-xl overflow-hidden flex items-center justify-center h-80 w-full transition-colors duration-300">
    <img
      src={banner.image}
      alt={banner.title}
      className="absolute inset-0 w-full h-full object-cover opacity-90"
    />
    <div className="relative z-10 flex flex-col items-start p-8">
      <h2 className="text-4xl font-extrabold text-white mb-4 drop-shadow-lg uppercase">{banner.title}</h2>
      <a
        href={banner.link}
        className="bg-white dark:bg-primary-600 dark:text-white text-black font-semibold px-6 py-2 rounded-full shadow hover:bg-gray-100 dark:hover:bg-primary-700 transition"
      >
        {banner.button}
      </a>
    </div>
  </div>
);

// Mock data sản phẩm + banner
const products = [
  {
    type: 'banner',
    image: '/images/poster.jpg',
    title: 'airMAX Dn8',
    button: 'Shop Sneakers',
    link: '/category/sneakers'
  },
  {
    _id: '1',
    name: 'Nike Air Max 270',
    brand: 'Nike',
    price: 150,
    images: ['/images/AM270.jpg'],
    discount: 10,
    rating: { average: 4.5, count: 128 },
    isNewArrival: true,
    isBestSeller: false,
    sizes: [
      { size: '38', stock: 10 },
      { size: '39', stock: 8 },
      { size: '40', stock: 5 },
      { size: '41', stock: 2 }
    ],
    colors: ['#000000', '#ffffff', '#e63946']
  },
  {
    _id: '2',
    name: 'Adidas Ultraboost',
    brand: 'Adidas',
    price: 180,
    images: ['/images/ultraboost.jpg'],
    discount: 0,
    rating: { average: 4.8, count: 200 },
    isNewArrival: false,
    isBestSeller: true,
    sizes: [
      { size: '39', stock: 7 },
      { size: '40', stock: 6 },
      { size: '41', stock: 4 }
    ],
    colors: ['#22223b', '#f2e9e4']
  },
  // Thêm nhiều sản phẩm khác nếu muốn
];

const categories = [
  'Lifestyle',
  'Sneakers',
  'Jordan',
  'Running',
  'Basketball',
  'Football',
  'Skateboarding',
  'Sandals, Slides & Flip Flops',
];

const sortOptions = [
  { value: '', label: 'Sắp xếp' },
  { value: 'price_asc', label: 'Giá tăng dần' },
  { value: 'price_desc', label: 'Giá giảm dần' },
];

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const [modalOpen, setModalOpen] = useState(false);
  const [addedProduct, setAddedProduct] = useState(null);
  const [addedSize, setAddedSize] = useState('');
  const [addedColor, setAddedColor] = useState('');
  const [addedQuantity, setAddedQuantity] = useState(1);
  const [variantModalOpen, setVariantModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Thêm state filter/sort từ query string
  const [searchParams, setSearchParams] = useSearchParams();
  const filterCategory = searchParams.get('category') || '';
  const sortBy = searchParams.get('sort') || '';

  // Khi chọn filter/sort mới
  const handleFilterChange = (cat) => {
    setSearchParams({ ...Object.fromEntries([...searchParams]), category: cat });
  };
  const handleSortChange = (sort) => {
    setSearchParams({ ...Object.fromEntries([...searchParams]), sort });
  };

  // Lọc và sort sản phẩm dựa trên filterCategory, sortBy
  let filteredProducts = products.filter(item => !item.type);
  if (filterCategory) {
    filteredProducts = filteredProducts.filter(p => p.brand === filterCategory || p.category === filterCategory);
  }
  if (sortBy === 'price_asc') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price_desc') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  }

  const handleAddToCartClick = (product) => {
    setSelectedProduct(product);
    setVariantModalOpen(true);
  };
  const handleConfirmVariant = (size, color) => {
    setVariantModalOpen(false);
    dispatch(addToCart({ product: selectedProduct, quantity: 1, size, color }));
    setAddedProduct(selectedProduct);
    setAddedSize(size);
    setAddedColor(color);
    setAddedQuantity(1);
    setModalOpen(true);
  };
  const handleViewCart = () => {
    setModalOpen(false);
    navigate('/cart');
  };
  const handleCheckout = () => {
    setModalOpen(false);
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filter */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6 transition-colors duration-300">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Categories</h2>
              <ul className="space-y-2">
                {categories.map((cat) => (
                  <li key={cat}>
                    <label className="cursor-pointer flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="accent-primary-600"
                        checked={filterCategory === cat}
                        onChange={() => handleFilterChange(cat)}
                      />
                      <span className="text-gray-700 dark:text-gray-300">{cat}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6 transition-colors duration-300">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Gender</h2>
              <ul className="space-y-2">
                <li><label className="flex items-center gap-2"><input type="checkbox" className="accent-primary-600" /><span className="text-gray-700 dark:text-gray-300">Mens</span></label></li>
                <li><label className="flex items-center gap-2"><input type="checkbox" className="accent-primary-600" /><span className="text-gray-700 dark:text-gray-300">Womens</span></label></li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6 transition-colors duration-300">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Shop By Price</h2>
              <ul className="space-y-2">
                <li><label className="flex items-center gap-2"><input type="checkbox" className="accent-primary-600" /><span className="text-gray-700 dark:text-gray-300">Under $100</span></label></li>
                <li><label className="flex items-center gap-2"><input type="checkbox" className="accent-primary-600" /><span className="text-gray-700 dark:text-gray-300">$100 - $200</span></label></li>
                <li><label className="flex items-center gap-2"><input type="checkbox" className="accent-primary-600" /><span className="text-gray-700 dark:text-gray-300">Over $200</span></label></li>
              </ul>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Top Filter Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">Sneakers Shoes <span className="font-normal text-gray-500 dark:text-gray-400">({filteredProducts.length})</span></div>
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-10.5 5.25h10.5" />
                  </svg>
                  Hide Filters
                </button>
                {/* Sort Dropdown đẹp với hiệu ứng trượt */}
                <Listbox value={sortBy} onChange={handleSortChange}>
                  <div className="relative w-44">
                    <Listbox.Button className="w-full min-w-[140px] px-4 py-2 pr-10 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition flex items-center justify-between whitespace-nowrap relative">
                      <span className="truncate whitespace-nowrap">{sortOptions.find(opt => opt.value === sortBy)?.label || 'Sắp xếp'}</span>
                      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                          <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 -translate-y-2"
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 -translate-y-2"
                      enterTo="opacity-100 translate-y-0"
                    >
                      <Listbox.Options className="absolute z-10 mt-2 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1">
                        {sortOptions.map((option) => (
                          <Listbox.Option
                            key={option.value}
                            value={option.value}
                            className={({ active, selected }) =>
                              `cursor-pointer select-none px-4 py-2 transition
                              ${active ? 'bg-primary-100 dark:bg-primary-700 text-primary-700 dark:text-white' : ''}
                              ${selected ? 'font-semibold text-gray-900 dark:text-white' : 'text-gray-800 dark:text-gray-200'}`
                            }
                          >
                            {option.label}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {products.map((item, idx) =>
                item.type === 'banner' ? (
                  <BannerCard key={idx} banner={item} />
                ) : null
              )}
              {filteredProducts.map((item, idx) => (
                <ProductCard key={item._id} product={item} onAddToCart={() => handleAddToCartClick(item)} />
              ))}
            </div>
          </main>
        </div>
      </div>
      <ScrollToTop />
      <AddToCartModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        product={addedProduct}
        size={addedSize}
        color={addedColor}
        quantity={addedQuantity}
        cartCount={cartCount}
        onViewCart={handleViewCart}
        onCheckout={handleCheckout}
      />
      <SelectVariantModal
        open={variantModalOpen}
        onClose={() => setVariantModalOpen(false)}
        product={selectedProduct}
        onConfirm={handleConfirmVariant}
      />
    </div>
  );
};

export default Products; 