import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/solid';

const SelectVariantModal = ({ open, onClose, product, onConfirm }) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [error, setError] = useState('');

  if (!product) return null;
  const sizes = product.sizes?.map(s => (typeof s === 'object' ? s.size : s)) || [];
  const colors = product.colors || [];

  const handleConfirm = () => {
    if (!selectedSize) {
      setError('Vui lòng chọn size!');
      return;
    }
    if (colors.length > 0 && !selectedColor) {
      setError('Vui lòng chọn màu!');
      return;
    }
    setError('');
    onConfirm(selectedSize, selectedColor);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
        >
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-md relative">
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-white transition"
              aria-label="Close"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Chọn size và màu</h2>
            <div className="mb-4">
              <div className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Size:</div>
              <div className="flex flex-wrap gap-2">
                {sizes.length === 0 && <span className="text-gray-400">Không có size</span>}
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg border font-semibold transition-all ${selectedSize === size ? 'bg-primary-600 text-white border-primary-600' : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 hover:bg-primary-100 dark:hover:bg-primary-900'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            {colors.length > 0 && (
              <div className="mb-4">
                <div className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Màu sắc:</div>
                <div className="flex flex-wrap gap-2">
                  {colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center ${selectedColor === color ? 'border-primary-600 ring-2 ring-primary-400' : 'border-gray-300 dark:border-gray-600'} `}
                      style={{ background: color }}
                      title={color}
                    >
                      {selectedColor === color && <span className="block w-4 h-4 bg-white rounded-full" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {error && <div className="text-red-500 mb-3 text-sm font-semibold">{error}</div>}
            <button
              onClick={handleConfirm}
              className="w-full py-3 rounded-full bg-primary-600 hover:bg-primary-700 text-white font-bold text-base mt-2 transition"
            >
              Thêm vào giỏ hàng
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SelectVariantModal; 