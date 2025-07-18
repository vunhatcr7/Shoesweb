import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { HeartIcon, ShoppingCartIcon, TrashIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import AddToCartModal from '../components/AddToCartModal';
import { useNavigate } from 'react-router-dom';
import SelectVariantModal from '../components/SelectVariantModal';

// Mock data wishlist


const Wishlist = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const [modalOpen, setModalOpen] = useState(false);
  const [addedProduct, setAddedProduct] = useState(null);
  const [addedSize, setAddedSize] = useState('');
  const [addedQuantity, setAddedQuantity] = useState(1);
  const [addedColor, setAddedColor] = useState('');
  const [variantModalOpen, setVariantModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleRemove = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này khỏi wishlist?')) {
      props.setWishlist(props.wishlist.filter(item => item._id !== id));
      toast('Đã xóa sản phẩm khỏi wishlist.', { icon: '🗑️' });
    }
  };

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

  const handleAddAllToCart = () => {
    if (props.wishlist.length === 0) return;
    props.wishlist.forEach(product => handleAddToCartClick(product));
    toast.success('Đã thêm tất cả sản phẩm vào giỏ hàng!');
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
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <HeartIcon className="h-8 w-8 text-pink-500" />
            Wishlist
          </h1>
          {props.wishlist.length > 0 && (
            <button
              onClick={handleAddAllToCart}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white px-5 py-2 rounded-lg font-semibold shadow transition-all duration-300"
            >
              <ShoppingCartIcon className="h-5 w-5" />
              Thêm tất cả vào giỏ hàng
            </button>
          )}
        </div>
        {props.wishlist.length === 0 ? (
          <div className="text-center py-24 text-gray-500 dark:text-gray-400 text-xl">
            <HeartIcon className="h-16 w-16 mx-auto mb-4 text-pink-400" />
            Danh sách yêu thích của bạn đang trống!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {props.wishlist.map(product => (
              <div key={product._id} className="relative group animate-fadeInUp">
                <ProductCard product={product} onAddToCart={() => handleAddToCartClick(product)} hideWishlistButton={true} />
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleRemove(product._id)}
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-md flex items-center justify-center"
                    title="Xóa khỏi wishlist"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
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
      </div>
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

export default Wishlist;