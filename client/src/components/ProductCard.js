import React from 'react';
import { Link } from 'react-router-dom';
import { EyeIcon, ShoppingCartIcon, HeartIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
// import { useState } from 'react';

const ProductCard = ({ product, onAddToCart, hideWishlistButton, onAddToWishlist, isWishlisted, square, hideDetailButton }) => {
  const {
    _id,
    name,
    brand,
    price,
    images,
    discount,
    // rating,
    isBestSeller,
    // description,
    colorCount,
    type
  } = product;

  // Giá sau giảm
  const discountedPrice = discount ? price - (price * discount / 100) : price;

  // MOCK: state cục bộ kiểm tra đã yêu thích chưa
  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    if (onAddToWishlist) {
      onAddToWishlist(product);
    }
  };

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product);
    } else {
      toast.success('Đã thêm vào giỏ hàng!');
    }
  };

  return (
    <div className={`bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-col h-full transition-transform duration-200 hover:shadow-xl hover:scale-[1.03] group relative ${square ? 'aspect-square max-w-xs' : ''}`}>
      <div className={`w-full ${square ? 'aspect-square' : 'h-56 sm:h-64 md:h-72'} bg-white flex items-center justify-center`}>
        <img
          src={images[0]}
          alt={name}
          className={`object-contain w-full h-full ${square ? 'rounded-full p-4' : 'max-h-56 sm:max-h-64 md:max-h-72'}`}
        />
      </div>
      <div className="p-3 sm:p-4 md:p-6 flex-1 flex flex-col justify-between">
        {isBestSeller && (
          <div className="text-xs sm:text-sm font-semibold text-red-600 mb-2">Bestseller</div>
        )}
        <div>
          <div className="font-bold text-base sm:text-lg text-gray-900 mb-1 leading-tight">{name}</div>
          <div className="text-sm sm:text-base text-gray-500 mb-1">{type || brand} Shoes</div>
          <div className="text-xs sm:text-sm text-gray-400 mb-2">{colorCount || 1} Colour</div>
        </div>
        <div className="mt-2">
          {discount > 0 && (
            <span className="text-xs sm:text-sm text-gray-400 line-through mr-2">{price.toLocaleString()}₫</span>
          )}
          <span className="text-base sm:text-lg font-bold text-gray-900">{discountedPrice.toLocaleString()}₫</span>
        </div>
      </div>
      {/* Nút hover */}
      <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 z-10">
        {!hideWishlistButton && (
          <button
            onClick={handleToggleWishlist}
            className="bg-white border border-gray-200 shadow-md rounded-full p-2 sm:p-2.5 flex items-center justify-center hover:bg-red-200 hover:text-red-500 transition-colors"
            title={isWishlisted ? 'Bỏ khỏi yêu thích' : 'Thêm vào yêu thích'}
          >
            <HeartIcon
              className={`h-4 w-4 sm:h-5 sm:w-5 ${isWishlisted ? 'text-red-500 fill-red-500' : 'text-gray-400'}`}
              fill={isWishlisted ? 'currentColor' : 'none'}
              stroke="currentColor"
            />
          </button>
        )}
        {!hideDetailButton && (
          <Link
            to={`/product/${_id}`}
            className="bg-white border border-gray-200 shadow-md rounded-full p-2 sm:p-2.5 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-colors"
            title="Xem chi tiết"
          >
            <EyeIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          </Link>
        )}
        <button
          onClick={handleAddToCart}
          className="bg-primary-600 hover:bg-primary-700 text-white rounded-full p-2 sm:p-2.5 shadow-md flex items-center justify-center transition-colors"
          title="Thêm vào giỏ hàng"
        >
          <ShoppingCartIcon className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      </div>
      <style>{`
        .group:hover .group-hover:opacity-100 { opacity: 1 !important; }
        .group:hover .group-hover:translate-y-0 { transform: translateY(0) !important; }
      `}</style>
    </div>
  );
};

export default ProductCard; 