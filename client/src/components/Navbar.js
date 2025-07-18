import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useSelector } from 'react-redux';
import {
  ShoppingCartIcon,
  UserIcon,
  HeartIcon,
  Bars3Icon as MenuIcon,
  XMarkIcon as XIcon,
  SunIcon,
  MoonIcon,
  MagnifyingGlassIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

// Mock data sản phẩm cho search demo
const mockProducts = [
  { _id: '1', name: 'Nike Air Max 270', image: '/images/AM270.jpg' },
  { _id: '2', name: 'Adidas Ultraboost', image: '/images/ultraboost.jpg' },
  { _id: '3', name: 'Nike Air Force 1', image: '/images/af1.jpg' },
  { _id: '4', name: 'Puma RS-X', image: '/images/RSX.jpg' },
  { _id: '5', name: 'Converse Chuck Taylor', image: '/images/CT.jpg' },
];

const productDropdown = [
  {
    title: 'Featured',
    items: [
      { label: 'New Arrivals', link: '/products?featured=new' },
      { label: 'Bestsellers', link: '/products?featured=bestseller' },
      { label: 'Shop All Sale', link: '/products?onSale=true' },
    ],
  },
  {
    title: 'Shoes',
    items: [
      { label: 'All Shoes', link: '/products' },
      { label: 'Lifestyle', link: '/category/lifestyle' },
      { label: 'Sneakers', link: '/category/sneakers' },
      { label: 'Jordan', link: '/category/jordan' },
      { label: 'Running', link: '/category/running' },
      { label: 'Football', link: '/category/football' },
      { label: 'Basketball', link: '/category/basketball' },
      { label: 'Skateboarding', link: '/category/skateboarding' },
      { label: 'Sandals and Slides', link: '/category/sandals' },
    ],
  },
  {
    title: 'Clothing',
    items: [
      { label: 'All Clothing', link: '/products?type=clothing' },
      { label: 'Tops and T-Shirts', link: '/products?type=tshirt' },
      { label: 'Shorts', link: '/products?type=shorts' },
      { label: 'Pants and Leggings', link: '/products?type=pants' },
      { label: 'Hoodies and Sweatshirts', link: '/products?type=hoodie' },
      { label: 'Jackets and Gilets', link: '/products?type=jackets' },
      { label: 'Jerseys and Kits', link: '/products?type=jersey' },
    ],
  },
];

const categoriesDropdown = [
  {
    title: 'All Categories',
    items: [
      { label: 'Lifestyle', link: '/category/lifestyle' },
      { label: 'Jordan', link: '/category/jordan' },
      { label: 'Sneakers', link: '/category/sneakers' },
      { label: 'Running', link: '/category/running' },
      { label: 'Basketball', link: '/category/basketball' },
      { label: 'Football', link: '/category/football' },
      { label: 'Skateboarding', link: '/category/skateboarding' },
      { label: 'Sandals & Slides', link: '/category/sandals' },
    ],
  },
  {
    title: 'Accessories',
    items: [
      { label: 'Bags & Backpacks', link: '/category/bags' },
      { label: 'Socks', link: '/category/socks' },
      { label: 'Hats & Headwear', link: '/category/hats' },
    ],
  },
];

const Navbar = ({ wishlistCount = 0 }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const [search, setSearch] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();
  const productDropdownRef = useRef(null);
  const categoriesDropdownRef = useRef(null);
  const { items } = useSelector((state) => state.cart);
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // Đóng dropdown khi click ra ngoài cho Products
  useEffect(() => {
    function handleClickOutside(event) {
      if (productDropdownRef.current && !productDropdownRef.current.contains(event.target)) {
        setShowProductDropdown(false);
      }
    }
    if (showProductDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProductDropdown]);

  // Đóng dropdown khi click ra ngoài cho Categories
  useEffect(() => {
    function handleClickOutside(event) {
      if (categoriesDropdownRef.current && !categoriesDropdownRef.current.contains(event.target)) {
        setShowCategoriesDropdown(false);
      }
    }
    if (showCategoriesDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCategoriesDropdown]);

  // Lọc gợi ý sản phẩm
  const suggestions = search.length > 0
    ? mockProducts.filter(p => p.name.toLowerCase().includes(search.toLowerCase())).slice(0, 5)
    : [];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search.trim())}`);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (name) => {
    setSearch(name);
    navigate(`/products?search=${encodeURIComponent(name)}`);
    setShowSuggestions(false);
  };

  const handleLogout = () => {
    // TODO: Thay bằng logic logout thực tế
    alert('Đã đăng xuất!');
    setShowProfileDropdown(false);
    navigate('/auth');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 gap-x-8">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img
                className="h-8 w-auto"
                src="/images/logo1.png"
                alt="Shoe Store"
              />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">Shoe Store</span>
            </Link>
          </div>

          {/* Search Bar (desktop) */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 justify-center mx-12 relative"
            autoComplete="off"
          >
            <input
              type="text"
              className="w-96 px-4 pr-10 py-2 rounded-full border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-gray-900 bg-white shadow-sm"
              placeholder="Tìm kiếm sản phẩm..."
              value={search}
              onChange={e => { setSearch(e.target.value); setShowSuggestions(true); }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            />
            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-primary-600 hover:bg-primary-700 text-white transition-all">
              <MagnifyingGlassIcon className="h-5 w-5" />
            </button>
            {/* Gợi ý sản phẩm */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute left-0 top-12 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-50 animate-fadeInUp">
                {suggestions.map(item => (
                  <button
                    key={item._id}
                    type="button"
                    className="flex items-center gap-3 w-full px-4 py-2 hover:bg-primary-50 text-left transition"
                    onMouseDown={() => handleSuggestionClick(item.name)}
                  >
                    <img src={item.image} alt={item.name} className="w-8 h-8 object-contain rounded" />
                    <span className="text-gray-900">{item.name}</span>
                  </button>
                ))}
              </div>
            )}
          </form>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">Home</Link>
            <div
              className="relative"
              ref={productDropdownRef}
            >
              <button
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 flex items-center gap-1"
                onClick={() => setShowProductDropdown(v => !v)}
              >
                Products
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </button>
              {/* Dropdown menu */}
              {showProductDropdown && (
                <div className="absolute left-0 top-full mt-2 w-[540px] bg-white dark:bg-gray-800 shadow-xl rounded-xl border border-gray-100 dark:border-gray-700 z-50 p-4 flex gap-4 animate-fadeInUp transition-colors duration-300" style={{ minHeight: '200px' }}>
                  {productDropdown.map((group) => (
                    <div key={group.title} className="min-w-[120px]">
                      <div className="font-semibold text-gray-900 dark:text-white mb-2">{group.title}</div>
                      <ul className="space-y-2">
                        {group.items.map((item) => (
                          <li key={item.label}>
                            <Link to={item.link} className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 text-sm block" onClick={() => setShowProductDropdown(false)}>
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div
              className="relative"
              ref={categoriesDropdownRef}
            >
              <button
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 flex items-center gap-1"
                onClick={() => setShowCategoriesDropdown(v => !v)}
              >
                Categories
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </button>
              {/* Dropdown menu */}
              {showCategoriesDropdown && (
                <div className="absolute left-0 top-full mt-2 w-[400px] bg-white dark:bg-gray-800 shadow-xl rounded-xl border border-gray-100 dark:border-gray-700 z-50 p-8 flex gap-8 animate-fadeInUp transition-colors duration-300" style={{ minHeight: '220px' }}>
                  {categoriesDropdown.map((group) => (
                    <div key={group.title} className="min-w-[150px]">
                      <div className="font-semibold text-gray-900 dark:text-white mb-3">{group.title}</div>
                      <ul className="space-y-2">
                        {group.items.map((item) => (
                          <li key={item.label}>
                            <Link to={item.link} className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 text-sm block" onClick={() => setShowCategoriesDropdown(false)}>
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <Link to="/about" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">About</Link>
          </div>

          {/* Icon group */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
            >
              {isDarkMode ? (
                <SunIcon className="h-5 w-5 text-yellow-500" />
              ) : (
                <MoonIcon className="h-5 w-5 text-gray-700" />
              )}
            </button>
            <Link to="/wishlist" className="relative text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
              <HeartIcon className="h-6 w-6" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 min-w-[20px] text-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link to="/cart" className="relative text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
              <ShoppingCartIcon className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full px-1.5 min-w-[20px] text-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <div className="relative">
              <button
                onClick={() => setShowProfileDropdown(v => !v)}
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-400"
              >
                <UserIcon className="h-6 w-6" />
              </button>
              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 z-50 animate-fadeInUp">
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-t-xl transition"
                    onClick={() => setShowProfileDropdown(false)}
                  >
                    <UserIcon className="h-5 w-5" /> Thông tin cá nhân
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-b-xl w-full transition"
                  >
                    <ArrowRightOnRectangleIcon className="h-5 w-5" /> Đăng xuất
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center ml-auto">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
            >
              <MenuIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Overlay mờ */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity duration-300"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Navigation */}
      <div
        className={`md:hidden bg-white dark:bg-gray-800 transition-all duration-300 fixed left-0 w-full z-50 rounded-b-2xl shadow-lg
          ${isMenuOpen ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-full opacity-0 pointer-events-none'}`}
        style={{ maxHeight: '80vh', top: '4rem' }}
      >
        <button
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-4 right-4 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
        >
          <XIcon className="h-6 w-6" />
        </button>
        {/* Search Bar in Sidebar */}
        <form
          onSubmit={handleSearchSubmit}
          className="px-3 pt-3 pb-2 flex items-center gap-2 relative"
          autoComplete="off"
        >
          <input
            type="text"
            className="flex-1 px-4 py-2 rounded-full border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-gray-900 bg-white shadow-sm"
            placeholder="Tìm kiếm sản phẩm..."
            value={search}
            onChange={e => { setSearch(e.target.value); setShowSuggestions(true); }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          />
          <button type="submit" className="absolute right-6 top-1/2 -translate-y-1/2 p-2 rounded-full bg-primary-600 hover:bg-primary-700 text-white transition-all">
            <MagnifyingGlassIcon className="h-5 w-5" />
          </button>
          {/* Gợi ý sản phẩm */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute left-0 top-12 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-50 animate-fadeInUp">
              {suggestions.map(item => (
                <button
                  key={item._id}
                  type="button"
                  className="flex items-center gap-3 w-full px-4 py-2 hover:bg-primary-50 text-left transition"
                  onMouseDown={() => handleSuggestionClick(item.name)}
                >
                  <img src={item.image} alt={item.name} className="w-8 h-8 object-contain rounded" />
                  <span className="text-gray-900">{item.name}</span>
                </button>
              ))}
            </div>
          )}
        </form>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
          >
            Products
          </Link>
          <Link
            to="/categories"
            className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
          >
            Categories
          </Link>
          <Link
            to="/about"
            className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
          >
            About
          </Link>
          <Link
            to="/profile"
            className="flex items-center gap-2 px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
            onClick={() => setIsMenuOpen(false)}
          >
            <UserIcon className="h-5 w-5" /> Thông tin cá nhân
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 text-base font-medium text-red-600 hover:text-red-700 w-full"
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5" /> Đăng xuất
          </button>
        </div>
        <div className="flex items-center space-x-4 px-3 py-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
          >
            {isDarkMode ? (
              <SunIcon className="h-5 w-5 text-yellow-500" />
            ) : (
              <MoonIcon className="h-5 w-5 text-gray-700" />
            )}
          </button>
          <Link to="/wishlist" className="relative text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
            <HeartIcon className="h-6 w-6" />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 min-w-[20px] text-center">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link to="/cart" className="relative text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
            <ShoppingCartIcon className="h-6 w-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full px-1.5 min-w-[20px] text-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
      <style>{`
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.3s ease-out;
        }
      `}</style>
    </nav>
  );
};

export default Navbar; 