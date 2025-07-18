import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../redux/slices/productSlice';
import { addToCart } from '../redux/slices/cartSlice';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
// import { StarIcon } from '@heroicons/react/24/solid';
import ProductCard from '../components/ProductCard';
import toast from 'react-hot-toast';
import AddToCartModal from '../components/AddToCartModal';
import SelectVariantModal from '../components/SelectVariantModal';

const mockProducts = [
  {
    _id: 'mock1',
    name: 'Nike Air Max 97',
    brand: 'Nike',
    price: 3500000,
    images: ['https://images.unsplash.com/photo-1517260911205-8a3bfa7b6b57?auto=format&fit=crop&w=400&q=80'],
    discount: 10,
    colorCount: 2,
    type: 'Sneaker',
  },
  {
    _id: 'mock2',
    name: 'Adidas Superstar',
    brand: 'Adidas',
    price: 2500000,
    images: ['https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80'],
    discount: 0,
    colorCount: 1,
    type: 'Classic',
  },
  {
    _id: 'mock3',
    name: 'Puma RS-X',
    brand: 'Puma',
    price: 2800000,
    images: ['https://images.unsplash.com/photo-1528701800484-905dffb7c6b4?auto=format&fit=crop&w=400&q=80'],
    discount: 5,
    colorCount: 3,
    type: 'Sport',
  },
];

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, isLoading } = useSelector((state) => state.products);
  const { items } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const [modalOpen, setModalOpen] = useState(false);
  const [addedProduct, setAddedProduct] = useState(null);
  const [addedSize, setAddedSize] = useState('');
  const [addedQuantity, setAddedQuantity] = useState(1);
  const [addedColor, setAddedColor] = useState('');
  const [variantModalOpen, setVariantModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (product && product.category) {
      fetch(`/api/products/related?category=${product.category}&exclude=${product._id}`)
        .then(res => res.json())
        .then(data => setRelatedProducts(data))
        .catch(() => setRelatedProducts([]));
    }
  }, [product]);

  useEffect(() => {
    setThumbsSwiper(null);
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Vui lòng chọn size!');
      return;
    }
    const sizeObj = product.sizes.find((s) => s.size === selectedSize);
    if (!sizeObj || sizeObj.stock < quantity) {
      toast.error('Size đã hết hàng!');
      return;
    }
    dispatch(addToCart({ product, quantity, size: selectedSize }));
    setAddedProduct(product);
    setAddedSize(selectedSize);
    setAddedQuantity(quantity);
    setModalOpen(true);
    toast.success('Đã thêm vào giỏ hàng!');
  };

  const handleAddRelatedToCartClick = (product) => {
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!product || !product.images || !Array.isArray(product.images) || product.images.length === 0 || !product.sizes) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <span className="text-red-500 text-lg font-semibold mb-4">Không tìm thấy sản phẩm hoặc dữ liệu sản phẩm không hợp lệ.</span>
        <button
          className="btn btn-primary"
          onClick={() => navigate('/products')}
        >
          Quay lại trang sản phẩm
        </button>
      </div>
    );
  }

  const discountedPrice = product.discount
    ? product.price - (product.price * product.discount) / 100
    : product.price;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 flex flex-col lg:flex-row gap-12">
        {/* Ảnh sản phẩm */}
        <div className="w-full lg:w-1/2">
          {Array.isArray(product.images) && product.images.filter(Boolean).length > 0 ? (
            <>
              <Swiper
                key={product._id}
                modules={[Navigation, Pagination, Thumbs]}
                navigation
                pagination={{ clickable: true }}
                thumbs={thumbsSwiper && !thumbsSwiper.destroyed ? { swiper: thumbsSwiper } : undefined}
                className="mb-4 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800"
              >
                {product.images.filter(Boolean).map((img, idx) => (
                  <SwiperSlide key={idx}>
                    <Zoom>
                      <img
                        src={img}
                        alt={product.name}
                        onError={(e) => { e.target.onerror = null; e.target.src = '/assets/img/CT.jpg'; }}
                        className="w-full h-[400px] object-contain bg-white dark:bg-gray-900 rounded-2xl cursor-zoom-in"
                      />
                    </Zoom>
                  </SwiperSlide>
                ))}
              </Swiper>
              {/* Thumbnail */}
              <Swiper
                key={product._id + '-thumbs'}
                modules={[Thumbs]}
                onSwiper={setThumbsSwiper}
                slidesPerView={Math.min(product.images.filter(Boolean).length, 4)}
                spaceBetween={12}
                className="rounded-xl"
              >
                {product.images.filter(Boolean).map((img, idx) => (
                  <SwiperSlide key={idx}>
                    <img
                      src={img}
                      alt={product.name}
                      onError={(e) => { e.target.onerror = null; e.target.src = '/assets/img/CT.jpg'; }}
                      className="w-20 h-20 object-contain rounded-xl border-2 border-transparent hover:border-primary-500 cursor-pointer bg-white dark:bg-gray-800"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </>
          ) : (
            <div className="w-full h-[400px] flex items-center justify-center bg-gray-200 dark:bg-gray-800 rounded-2xl">
              <span className="text-gray-400">Không có ảnh</span>
            </div>
          )}
        </div>
        {/* Thông tin sản phẩm */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{product.name}</h1>
          <div className="flex items-center gap-3">
            <span className="text-xl font-semibold text-primary-600 dark:text-primary-400">${discountedPrice.toFixed(2)}</span>
            {product.discount > 0 && (
              <span className="text-base line-through text-gray-400">${(product.price * (1 + product.discount / 100)).toFixed(2)}</span>
            )}
            {product.discount > 0 && (
              <span className="ml-2 px-2 py-1 rounded bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-300 text-xs font-bold">-{product.discount}%</span>
            )}
          </div>
          {/* Bỏ phần đánh giá */}
          {/* <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} className={`h-5 w-5 ${i < Math.round(product.rating.average) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} />
            ))}
            <span className="text-gray-600 dark:text-gray-300 text-sm">({product.rating.count} đánh giá)</span>
          </div> */}
          <div className="text-gray-700 dark:text-gray-300 leading-relaxed">{product.description}</div>
          {/* Bỏ box thông tin specs nếu đã có phần chọn size/màu bên dưới */}
          {/* <div className="grid grid-cols-2 gap-4 bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
            {Object.entries(product.specs).map(([key, value]) => (
              <div key={key} className="flex flex-col">
                <span className="text-xs text-gray-500 dark:text-gray-400">{key}</span>
                <span className="font-semibold text-gray-900 dark:text-white">{value}</span>
              </div>
            ))}
          </div> */}
          {/* Chọn size và màu */}
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-700 dark:text-white">Size:</span>
              <div className="flex gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s.size}
                    onClick={() => s.stock > 0 && setSelectedSize(s.size)}
                    disabled={s.stock === 0}
                    className={`w-10 h-10 border rounded-md flex items-center justify-center text-0.5xl transition dark:text-white font-semibold
                      ${selectedSize === s.size ? 'border-blue-500 bg-blue-100 dark:bg-blue-900' : 'border-gray-400 bg-transparent'}
                      ${s.stock === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                    `}
                    title={s.stock === 0 ? 'Hết hàng' : ''}
                  >
                    {s.size}
                  </button>
                ))}
              </div>
            </div>
            {product.colors && product.colors.length > 0 && (
              <div className="flex items-center gap-2 ml-6">
                <span className="font-semibold text-gray-700 dark:text-white">Màu:</span>
                <div className="flex gap-2">
                  {product.colors.map((c, idx) => (
                    <button
                      key={idx}
                      onClick={() => setAddedColor(c.code || c)}
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition 
                        ${addedColor === (c.code || c) ? 'border-blue-500 ring-2 ring-blue-300' : 'border-gray-300 dark:border-gray-600'}`}
                      style={{ backgroundColor: c.code || c }}
                      title={c.name || c}
                    >
                      {addedColor === (c.code || c) && (
                        <span className="block w-3 h-3 bg-white rounded-full" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 border rounded-md dark:text-white"
              >
                -
              </button>
              <span className="w-8 text-center dark:text-white">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1 border rounded-md dark:text-white"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="flex-1 btn btn-primary"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      {/* Sản phẩm liên quan */}
      <div className="max-w-6xl mx-auto px-4 mt-20">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Gợi ý sản phẩm tương tự</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Card sản phẩm thật */}
          {relatedProducts.map((prod, idx) => (
            <div key={prod._id} className="animate-fadeInUp" style={{ animationDelay: `${idx * 0.1 + 0.2}s` }}>
              <ProductCard product={prod} onAddToCart={() => handleAddRelatedToCartClick(prod)} square />
            </div>
          ))}
          {/* Card sản phẩm mẫu */}
          {mockProducts.map((prod, idx) => (
            <div key={prod._id} className="animate-fadeInUp" style={{ animationDelay: `${(idx + relatedProducts.length) * 0.1 + 0.2}s` }}>
              <ProductCard product={prod} square hideDetailButton />
            </div>
          ))}
        </div>
      </div>
      <AddToCartModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        product={addedProduct}
        size={addedSize}
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
      <style>{`
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.7s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
      `}</style>
    </div>
  );
};

export default ProductDetail; 