import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/solid';

const AddToCartModal = ({ open, onClose, product, size, quantity, cartCount, onViewCart, onCheckout }) => {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [open, onClose]);

  if (!product) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.35 }}
          className="fixed top-6 right-6 z-50 w-full max-w-xs sm:max-w-sm bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 p-6 flex flex-col gap-4"
          style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-white transition"
            aria-label="Close"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
          <div className="flex items-center gap-2 mb-2">
            <CheckCircleIcon className="h-6 w-6 text-green-500" />
            <span className="text-lg font-semibold text-gray-900 dark:text-white">Added to Bag</span>
          </div>
          <div className="flex gap-4 items-center">
            <img
              src={product.images?.[0]}
              alt={product.name}
              className="w-20 h-20 object-cover rounded-xl border border-gray-200 dark:border-gray-700"
            />
            <div className="flex-1 min-w-0">
              <div className="font-bold text-gray-900 dark:text-white truncate">{product.name}</div>
              <div className="text-sm text-gray-500 dark:text-gray-300 truncate">{product.type || product.brand} Shoes</div>
              <div className="text-sm text-gray-500 dark:text-gray-300">Size {size}</div>
              <div className="text-base font-bold text-gray-900 dark:text-white mt-1">{product.price?.toLocaleString()}₫</div>
            </div>
          </div>
          <div className="flex flex-col gap-3 mt-2">
            <button
              onClick={onViewCart}
              className="w-full py-3 rounded-full border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white font-semibold text-base bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              View Bag ({cartCount})
            </button>
            <button
              onClick={onCheckout}
              className="w-full py-3 rounded-full bg-black dark:bg-white text-white dark:text-black font-bold text-base hover:bg-gray-800 dark:hover:bg-gray-200 transition"
            >
              Checkout
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddToCartModal; 