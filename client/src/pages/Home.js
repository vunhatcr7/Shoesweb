import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ScrollToTop from '../components/ScrollToTop';
import { motion } from 'framer-motion';
import SpecialOffers from '../components/SpeicialOffers';
import Brands from '../components/Brands';
// import { Button } from '@mui/material';
import { useTheme } from '../context/ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import AddToCartModal from '../components/AddToCartModal';
import SelectVariantModal from '../components/SelectVariantModal';
import { toast } from 'react-toastify';

const heroSlides = [
  {
    image: '/images/banner18.jpg',
    title: 'Step Into Style',
    subtitle: 'Discover the latest trends in footwear',
    button: 'Shop Now',
    link: '/products',
  },
  {
    image: '/images/banner26.png',
    title: 'New Arrivals',
    subtitle: 'Explore our latest collection',
    button: 'See More',
    link: '/products',
  },
  {
    image: '/images/lebron22.png',
    title: 'Basketball Shoes',
    subtitle: 'Performance and comfort for every game',
    button: 'Shop Basketball',
    link: '/category/basketball',
  },
];

const categories = [
  {
    name: 'Running',
    image: '/images/nike-running.jpg',
    link: '/category/running',
  },
  {
    name: 'Basketball',
    image: '/images/nike basket.jpg',
    link: '/category/basketball',
  },
  {
    name: 'Lifestyle',
    image: '/images/nike-lifestyle.jpg',
    link: '/category/lifestyle',
  },
  // Thêm danh mục mới ở đây nếu muốn
];

const featuredProducts = [
  {
    _id: '1',
    name: 'Nike Air Max 270',
    brand: 'Nike',
    price: 150,
    images: ['/images/AM270.jpg'],
    discount: 0,
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
  {
    _id: '3',
    name: 'Nike Air Force 1',
    brand: 'Nike',
    price: 120,
    images: ['/images/af1.jpg'],
    discount: 5,
    rating: { average: 4.7, count: 300 },
    isNewArrival: true,
    isBestSeller: true,
    sizes: [
      { size: '38', stock: 3 },
      { size: '40', stock: 6 },
      { size: '42', stock: 2 }
    ],
    colors: ['#ffffff', '#1d3557']
  },
  {
    _id: '4',
    name: 'Puma RS-X',
    brand: 'Puma',
    price: 140,
    images: ['/images/RSX.jpg'],
    discount: 0,
    rating: { average: 4.3, count: 90 },
    isNewArrival: false,
    isBestSeller: true,
    sizes: [
      { size: '39', stock: 5 },
      { size: '41', stock: 3 }
    ],
    colors: ['#457b9d', '#f1faee']
  },
  {
    _id: '5',
    name: 'Converse Chuck Taylor',
    brand: 'Converse',
    price: 100,
    images: ['/images/CT.jpg'],
    discount: 0,
    rating: { average: 4.6, count: 150 },
    isNewArrival: true,
    isBestSeller: false,
    sizes: [
      { size: '38', stock: 2 },
      { size: '40', stock: 1 }
    ],
    colors: ['#ffffff', '#000000']
  },
];

const Home = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const [modalOpen, setModalOpen] = useState(false);
  const [addedProduct, setAddedProduct] = useState(null);
  const [addedSize, setAddedSize] = useState('');
  const [addedColor, setAddedColor] = useState('');
  const [addedQuantity, setAddedQuantity] = useState(1);
  const { isDarkMode } = useTheme();
  const [variantModalOpen, setVariantModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [addedInfo] = useState({});

  // Lọc sản phẩm Best Seller và New Collection
  const bestSellers = featuredProducts.filter(p => p.isBestSeller).slice(0, 4);
  const newCollection = featuredProducts.filter(p => p.isNewArrival).slice(0, 4);

  const handleAddToCart = (product) => {
    setSelectedProduct(product);
    setVariantModalOpen(true);
  };

  const handleViewCart = () => {
    setModalOpen(false);
    navigate('/cart');
  };
  const handleCheckout = () => {
    setModalOpen(false);
    navigate('/checkout');
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

  // Hàm thêm vào wishlist
  const handleAddToWishlist = (product) => {
    props.setWishlist((prev) => {
      if (prev.find((item) => item._id === product._id)) return prev;
      toast.success('Bạn đã thêm vào yêu thích!');
      return [...prev, product];
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section - Carousel */}
      <section className="relative h-[700px] md:h-[800px] bg-gray-900 overflow-hidden">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          loop
          className="h-full"
        >
          {heroSlides.map((slide, idx) => (
            <SwiperSlide key={idx}>
              <div className="absolute inset-0 w-full h-full">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover object-center"
                  style={{ minHeight: '700px', maxHeight: '100vh' }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-primary-900/40 to-black/60" />
              </div>
              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center">
                <div className="text-white text-center animate-fadeInUp">
                  <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg animate-slideInDown">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 animate-fadeInUp">
                    {slide.subtitle}
                  </p>
                  <Link
                    to={slide.link}
                    className="btn btn-primary text-lg px-8 py-3 shadow-xl transition-all duration-300 relative overflow-hidden group"
                  >
                    <span className="relative z-10">{slide.button}</span>
                    <span className="absolute inset-0 bg-primary-400 opacity-0 group-hover:opacity-20 transition duration-300 rounded-full blur-xl" />
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Featured Categories */}
      <section className='mt-10'>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 animate-fadeInUp text-center">
            SHOP BY CATEGORY
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((cat, idx) => (
              <Link
                key={cat.name}
                to={cat.link}
                className="relative h-64 rounded-xl overflow-hidden group shadow-lg transition-transform duration-300 hover:scale-105 animate-fadeInUp"
                style={{ animationDelay: `${idx * 0.1 + 0.2}s` }}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-primary-600/80 transition-all duration-300 flex items-end p-6">
                  <h3 className="text-2xl font-bold text-white drop-shadow-lg animate-fadeInUp">
                    {cat.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Best Seller Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white animate-fadeInUp">BEST SELLER</h2>
            <Link to="/products?featured=bestseller" className="animate-fadeInUp">
              <button
                className="bg-primary-600 hover:bg-primary-700 text-white font-bold px-6 py-2 rounded-lg shadow transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-400 dark:bg-primary-500 dark:hover:bg-primary-400 dark:text-white"
              >
                Xem tất cả
              </button>
            </Link>
          </div>
          <p className="text-gray-500 dark:text-gray-400 mb-8 animate-fadeInUp">Những đôi giày được yêu thích và bán chạy nhất hiện nay.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestSellers.map((product, idx) => (
              <div key={product._id} className="animate-fadeInUp" style={{ animationDelay: `${idx * 0.1 + 0.2}s` }}>
                <ProductCard
                  product={product}
                  onAddToCart={() => handleAddToCart(product)}
                  onAddToWishlist={handleAddToWishlist}
                  isWishlisted={props.wishlist.some(item => item._id === product._id)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers with Animation */}
      {/* Special Offers */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="dark:bg-gray-900 transition-colors duration-500"
      >
        <SpecialOffers theme="light" />
      </motion.div>

      {/* New Collection Section */}
      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white animate-fadeInUp">New Collection</h2>
            <Link to="/products?featured=bestseller" className="animate-fadeInUp">
              <button
                className="bg-primary-600 hover:bg-primary-700 text-white font-bold px-6 py-2 rounded-lg shadow transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-400 dark:bg-primary-500 dark:hover:bg-primary-400 dark:text-white"
              >
                Xem tất cả
              </button>
            </Link>
          </div>
          <p className="text-gray-500 dark:text-gray-400 mb-8 animate-fadeInUp">Khám phá những mẫu giày mới nhất, cập nhật xu hướng thời trang.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {newCollection.map((product, idx) => (
              <div key={product._id} className="animate-fadeInUp" style={{ animationDelay: `${idx * 0.1 + 0.2}s` }}>
                <ProductCard
                  product={product}
                  onAddToCart={() => handleAddToCart(product)}
                  onAddToWishlist={handleAddToWishlist}
                  isWishlisted={props.wishlist.some(item => item._id === product._id)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Trusted Brands with Animation */}
      {/* Brands */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="dark:bg-gray-900 transition-colors duration-500 mt-10"
      >
        <Brands theme={isDarkMode ? 'dark' : 'light'} />
      </motion.div>


      {/* Newsletter Section */}
      <section >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 animate-fadeInUp">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8 animate-fadeInUp">
            Get the latest updates on new products and upcoming sales
          </p>
          <form className="max-w-md mx-auto flex gap-4 animate-fadeInUp">
            <input
              type="email"
              placeholder="Enter your email"
              className="input flex-1 focus:ring-2 focus:ring-primary-400 transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-200 dark:border-gray-600"
            />
            <button type="submit" className="btn btn-primary relative overflow-hidden group">
              <span className="relative z-10">Subscribe</span>
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition duration-300 rounded-full blur-xl" />
            </button>
          </form>
        </div>
      </section>

      {/* Custom Animations */}
      <style>{`
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInDown {
          0% { opacity: 0; transform: translateY(-40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes zoomIn {
          0% { transform: scale(1.08); }
          100% { transform: scale(1); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        .animate-slideInDown {
          animation: slideInDown 0.8s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        .animate-zoomIn {
          animation: zoomIn 1.2s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
      `}</style>
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
      <AddToCartModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        product={addedInfo.product}
        size={addedInfo.size}
        color={addedInfo.color}
        quantity={addedInfo.quantity}
        cartCount={cartCount}
        onViewCart={() => navigate('/cart')}
        onCheckout={() => navigate('/checkout')}
      />
    </div>
  );
};

export default Home; 