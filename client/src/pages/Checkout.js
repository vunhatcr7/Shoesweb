import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createOrder } from '../redux/slices/orderSlice';
import { clearCart } from '../redux/slices/cartSlice';
import { useTheme } from '../context/ThemeContext';
import { CreditCardIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';


const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, totalAmount } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { isDarkMode } = useTheme();

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    paymentMethod: 'credit_card',
  });

  const [voucherCode, setVoucherCode] = useState('');
  const [voucherInfo, setVoucherInfo] = useState(null);
  const [voucherError, setVoucherError] = useState('');
  const [discount, setDiscount] = useState(0);
  const [checkingVoucher, setCheckingVoucher] = useState(false);

  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvv: '',
  });
  const [cardError, setCardError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCardChange = (e) => {
    setCardInfo({
      ...cardInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckVoucher = async () => {
    setVoucherError('');
    setVoucherInfo(null);
    setDiscount(0);
    if (!voucherCode) {
      setVoucherError('Vui lòng nhập mã voucher!');
      return;
    }
    setCheckingVoucher(true);
    try {
      const res = await axios.post('/api/vouchers/validate', {
        code: voucherCode,
        orderValue: totalAmount,
        productIds: items.map(i => i.product._id),
      });
      setVoucherInfo(res.data.voucher);
      setDiscount(res.data.discount);
      setVoucherError('');
    } catch (err) {
      setVoucherInfo(null);
      setDiscount(0);
      setVoucherError(err.response?.data?.message || 'Voucher không hợp lệ!');
    }
    setCheckingVoucher(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCardError('');
    if (formData.paymentMethod === 'credit_card') {
      // Validate cơ bản
      if (!cardInfo.cardNumber || !cardInfo.cardName || !cardInfo.cardExpiry || !cardInfo.cardCvv) {
        setCardError('Vui lòng nhập đầy đủ thông tin thẻ!');
        return;
      }
      if (cardInfo.cardNumber.length < 12 || cardInfo.cardNumber.length > 19) {
        setCardError('Số thẻ không hợp lệ!');
        return;
      }
      if (cardInfo.cardCvv.length < 3 || cardInfo.cardCvv.length > 4) {
        setCardError('Mã CVV không hợp lệ!');
        return;
      }
    }
    const orderData = {
      items: items.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
        size: item.size,
        price: item.product.discount
          ? item.product.price - (item.product.price * item.product.discount) / 100
          : item.product.price,
      })),
      shippingAddress: {
        fullName: formData.fullName,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
      },
      paymentMethod: formData.paymentMethod,
      totalAmount: totalAmount - discount,
      tax: (totalAmount - discount) * 0.1,
      shippingCost: 0,
      voucher: voucherInfo ? voucherInfo.code : undefined,
      cardInfo: formData.paymentMethod === 'credit_card' ? cardInfo : undefined,
    };
    try {
      await dispatch(createOrder(orderData)).unwrap();
      dispatch(clearCart());
      navigate('/orders');
    } catch (error) {
      alert(error);
    }
  };

  const paymentMethods = [
    {
      value: 'cod',
      label: 'Tiền mặt',
      icon: <CurrencyDollarIcon className="h-6 w-6 text-blue-400" />
    },
    {
      value: 'credit_card',
      label: 'Credit Card',
      icon: <CreditCardIcon className="h-6 w-6 text-blue-400" />
    },
    {
      value: 'momo',
      label: 'Momo',
      icon: <img src="/images/MoMo_logo.png" alt="Momo" className="h-7 w-7 object-contain" />
    },
    {
      value: 'vnpay',
      label: 'VNPay',
      icon: <img src="/images/vnpay-logo-vinadesign-25-12-57-55.jpg" alt="VNPay" className="h-7 w-7 object-contain" />
    },
  ];

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-8">
            Please add items to your cart before proceeding to checkout.
          </p>
          <button
            onClick={() => navigate('/products')}
            className="btn btn-primary"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-16 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className={`text-3xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Checkout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Shipping Information */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Shipping Information</h2>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Full Name</label>
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required className={`input mt-1 ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : ''}`} />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required className={`input mt-1 ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : ''}`} />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Phone</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className={`input mt-1 ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : ''}`} />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Address</label>
                    <input type="text" name="address" value={formData.address} onChange={handleChange} required className={`input mt-1 ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : ''}`} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>City</label>
                      <input type="text" name="city" value={formData.city} onChange={handleChange} required className={`input mt-1 ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : ''}`} />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>State</label>
                      <input type="text" name="state" value={formData.state} onChange={handleChange} required className={`input mt-1 ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : ''}`} />
                    </div>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>ZIP Code</label>
                    <input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} required className={`input mt-1 ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : ''}`} />
                  </div>
                </div>
              </div>
              <div>
                <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Payment Method</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {paymentMethods.map((pm) => (
                    <label
                      key={pm.value}
                      className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all duration-200 shadow-sm
                        ${formData.paymentMethod === pm.value ? 'border-primary-600 ring-2 ring-primary-400 bg-primary-50 dark:bg-primary-900/30' : isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}
                        hover:border-primary-500 hover:bg-primary-100 dark:hover:bg-primary-800`}
                      style={{ boxShadow: formData.paymentMethod === pm.value ? '0 0 0 2px #3b82f6' : undefined }}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={pm.value}
                        checked={formData.paymentMethod === pm.value}
                        onChange={handleChange}
                        className="h-5 w-5 text-primary-600 focus:ring-primary-500"
                      />
                      {pm.icon}
                      <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{pm.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Mã voucher</label>
                <div className="flex gap-2 mt-1">
                  <input
                    type="text"
                    value={voucherCode}
                    onChange={e => setVoucherCode(e.target.value)}
                    className={`input flex-1 ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : ''}`}
                    placeholder="Nhập mã giảm giá..."
                    disabled={!!voucherInfo}
                  />
                  <button
                    type="button"
                    onClick={handleCheckVoucher}
                    className="btn btn-secondary"
                    disabled={checkingVoucher || !!voucherInfo}
                  >
                    {checkingVoucher ? 'Đang kiểm tra...' : 'Áp dụng'}
                  </button>
                  {!!voucherInfo && (
                    <button type="button" className="btn btn-danger" onClick={() => { setVoucherInfo(null); setDiscount(0); setVoucherCode(''); }}>Hủy</button>
                  )}
                </div>
                {voucherError && <div className="text-red-500 text-sm mt-1">{voucherError}</div>}
                {voucherInfo && <div className="text-green-600 text-sm mt-1">Áp dụng thành công: {voucherInfo.name} (-{discount.toLocaleString()}₫)</div>}
              </div>
              {/* Hiệu ứng xổ xuống cho form credit card */}
              <AnimatePresence>
                {formData.paymentMethod === 'credit_card' && (
                  <motion.div
                    key="credit-card-form"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 mt-2">
                      <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Thông tin thẻ tín dụng</h3>
                      <div>
                        <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Số thẻ</label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={cardInfo.cardNumber}
                          onChange={handleCardChange}
                          className={`input mt-1 ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : ''}`}
                          placeholder="Nhập số thẻ (12-19 số)"
                          maxLength={19}
                          inputMode="numeric"
                          required
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Tên chủ thẻ</label>
                        <input
                          type="text"
                          name="cardName"
                          value={cardInfo.cardName}
                          onChange={handleCardChange}
                          className={`input mt-1 ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : ''}`}
                          placeholder="Tên in trên thẻ"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Ngày hết hạn</label>
                          <input
                            type="text"
                            name="cardExpiry"
                            value={cardInfo.cardExpiry}
                            onChange={handleCardChange}
                            className={`input mt-1 ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : ''}`}
                            placeholder="MM/YY"
                            maxLength={5}
                            required
                          />
                        </div>
                        <div>
                          <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>CVV</label>
                          <input
                            type="password"
                            name="cardCvv"
                            value={cardInfo.cardCvv}
                            onChange={handleCardChange}
                            className={`input mt-1 ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : ''}`}
                            placeholder="CVV"
                            maxLength={4}
                            required
                          />
                        </div>
                      </div>
                      {cardError && <div className="text-red-500 text-sm mt-1">{cardError}</div>}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <button type="submit" className="btn btn-primary w-full">Place Order</button>
            </form>
          </div>
          {/* Order Summary */}
          <div>
            <div className={`p-6 rounded-lg shadow ${isDarkMode ? 'bg-gray-800 text-white border border-gray-700' : 'bg-white'}`}>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Order Summary</h2>
              <div className="space-y-4">
                {items.map((item) => {
                  const discountedPrice = item.product.discount
                    ? item.product.price - (item.product.price * item.product.discount) / 100
                    : item.product.price;
                  return (
                    <div key={`${item.product._id}-${item.size}`} className="flex items-center space-x-4">
                      <img src={item.product.images[0]} alt={item.product.name} className="w-16 h-16 object-cover rounded" />
                      <div className="flex-1">
                        <h3 className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{item.product.name}</h3>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Size: {item.size} | Quantity: {item.quantity}</p>
                      </div>
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>${(discountedPrice * item.quantity).toFixed(2)}</p>
                    </div>
                  );
                })}
                {discount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-green-600 dark:text-green-400 font-semibold">Giảm giá voucher</span>
                    <span className="font-semibold text-green-600 dark:text-green-400">-{discount.toLocaleString()}₫</span>
                  </div>
                )}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Subtotal</span>
                    <span className="font-medium">${(totalAmount - discount).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Shipping</span>
                    <span className="font-medium">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Tax</span>
                    <span className="font-medium">${((totalAmount - discount) * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className={`text-lg font-semibold ${isDarkMode ? 'text-white' : ''}`}>Total</span>
                    <span className={`text-lg font-semibold ${isDarkMode ? 'text-white' : ''}`}>${(totalAmount - discount + (totalAmount - discount) * 0.1).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 