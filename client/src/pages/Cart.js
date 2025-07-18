import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { TrashIcon, TagIcon } from '@heroicons/react/24/outline';
import { updateQuantity, removeFromCart } from '../redux/slices/cartSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
const Cart = () => {
  const dispatch = useDispatch();
  const { items, totalAmount } = useSelector((state) => state.cart);

  const handleUpdateQuantity = (productId, size, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ productId, size, quantity: newQuantity }));
  };

  const handleRemoveItem = (productId, size) => {
    dispatch(removeFromCart({ productId, size }));
  };
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Your cart is empty
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link to="/products" className="btn btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-10 text-center drop-shadow-lg">Shopping Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence>
              {items.map((item, idx) => {
                const discountedPrice = item.product.discount
                  ? item.product.price - (item.product.price * item.product.discount) / 100
                  : item.product.price;
                return (
                  <motion.div
                    key={`${item.product._id}-${item.size}`}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 40 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="flex items-center gap-4 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 p-4 md:p-6 group"
                  >
                    <div className="relative">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-xl border-2 border-primary-100 dark:border-primary-700 group-hover:scale-105 transition-transform duration-300"
                      />
                      {item.product.discount > 0 && (
                        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded shadow-lg animate-pulse">
                          -{item.product.discount}%
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/product/${item.product._id}`}
                        className="text-lg md:text-xl font-bold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                      >
                        {item.product.name}
                      </Link>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-full font-semibold">{item.product.brand}</span>
                        {/* Có thể thêm rating ở đây nếu muốn */}
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Size: {item.size}</p>
                      <div className="flex items-center gap-2 mt-3">
                        <motion.button
                          whileTap={{ scale: 0.85 }}
                          onClick={() => handleUpdateQuantity(item.product._id, item.size, item.quantity - 1)}
                          className="px-3 py-1 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-lg font-bold text-gray-700 dark:text-gray-200 hover:bg-primary-100 dark:hover:bg-primary-900 transition"
                        >
                          -
                        </motion.button>
                        <span className="w-10 text-center text-lg font-semibold text-gray-900 dark:text-white">
                          {item.quantity}
                        </span>
                        <motion.button
                          whileTap={{ scale: 0.85 }}
                          onClick={() => handleUpdateQuantity(item.product._id, item.size, item.quantity + 1)}
                          className="px-3 py-1 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-lg font-bold text-gray-700 dark:text-gray-200 hover:bg-primary-100 dark:hover:bg-primary-900 transition"
                        >
                          +
                        </motion.button>
                      </div>
                    </div>
                    <div className="text-right min-w-[100px]">
                      <p className="text-lg md:text-xl font-bold text-primary-600 dark:text-primary-400">
                        ${(discountedPrice * item.quantity).toFixed(2)}
                      </p>
                      {item.product.discount > 0 && (
                        <p className="text-sm text-gray-400 line-through">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      )}
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.8 }}
                      onClick={() => handleRemoveItem(item.product._id, item.size)}
                      className="text-gray-400 hover:text-red-500 transition-colors ml-2"
                      title="Remove"
                    >
                      <TrashIcon className="h-6 w-6" />
                    </motion.button>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
          {/* End Cart Items */}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1 mt-10">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 p-6 md:p-8 sticky top-24"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <TagIcon className="h-6 w-6 text-primary-500" /> Order Summary
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  ${totalAmount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Shipping</span>
                <span className="font-semibold text-green-600 dark:text-green-400">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Tax</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  ${(totalAmount * 0.1).toFixed(2)}
                </span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">Total</span>
                  <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
                    ${(totalAmount * 1.1).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.96 }}
              className="btn btn-primary w-full mt-8 py-3 text-lg font-bold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Cart; 