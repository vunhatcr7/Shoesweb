import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

const orders = [
  {
    _id: '1',
    createdAt: new Date().toISOString(),
    totalAmount: 1500000,
    tax: 150000,
    items: [
      {
        product: {
          _id: 'p1',
          name: 'Giày Sneaker Đỏ',
          images: [
            'https://via.placeholder.com/64x64.png?text=Giay+1',
          ],
        },
        size: 42,
        quantity: 1,
        price: 1000000,
      },
      {
        product: {
          _id: 'p2',
          name: 'Giày Thể Thao Xanh',
          images: [
            'https://via.placeholder.com/64x64.png?text=Giay+2',
          ],
        },
        size: 41,
        quantity: 2,
        price: 250000,
      },
    ],
    shippingAddress: {
      fullName: 'Nguyễn Văn A',
      address: '123 Đường ABC',
      city: 'Hà Nội',
      state: 'HN',
      zipCode: '100000',
    },
    paymentMethod: 'credit_card',
  },
];

const Orders = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  if (orders.length === 0) {
    return (
      <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <button
            onClick={toggleTheme}
            className="fixed top-4 right-4 z-50 bg-gray-200 dark:bg-gray-800 p-2 rounded-full shadow hover:bg-gray-300 dark:hover:bg-gray-700 transition"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <SunIcon className="w-6 h-6 text-yellow-500" /> : <MoonIcon className="w-6 h-6 text-gray-700" />}
          </button>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              No orders found
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              You haven't placed any orders yet.
            </p>
            <Link to="/products" className="btn btn-primary">
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <button
          onClick={toggleTheme}
          className="fixed top-4 right-4 z-50 bg-gray-200 dark:bg-gray-800 p-2 rounded-full shadow hover:bg-gray-300 dark:hover:bg-gray-700 transition"
          aria-label="Toggle theme"
        >
          {isDarkMode ? <SunIcon className="w-6 h-6 text-yellow-500" /> : <MoonIcon className="w-6 h-6 text-gray-700" />}
        </button>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">My Orders</h1>

        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white dark:bg-gray-900 rounded-lg shadow overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Order #{order._id}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                      Placed on{' '}
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      ${order.totalAmount.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                      {order.items.length} items
                    </p>
                  </div>
                </div>

                <div className="border-t pt-4 border-gray-200 dark:border-gray-700">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        Shipping Address
                      </h3>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                        {order.shippingAddress.fullName}
                        <br />
                        {order.shippingAddress.address}
                        <br />
                        {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                        {order.shippingAddress.zipCode}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        Payment Method
                      </h3>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                        {order.paymentMethod === 'credit_card'
                          ? 'Credit Card'
                          : 'PayPal'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Order Items
                  </h3>
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div
                        key={`${item.product._id}-${item.size}`}
                        className="flex items-center space-x-4"
                      >
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                            {item.product.name}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-300">
                            Size: {item.size} | Quantity: {item.quantity}
                          </p>
                        </div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {(item.price * item.quantity).toLocaleString()}₫
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 border-t pt-4 border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-300">Subtotal</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {order.totalAmount.toLocaleString()}₫
                    </span>
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-gray-500 dark:text-gray-300">Shipping</span>
                    <span className="font-medium text-gray-900 dark:text-white">Free</span>
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-gray-500 dark:text-gray-300">Tax</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {order.tax.toLocaleString()}₫
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-medium mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-gray-900 dark:text-white">Total</span>
                    <span className="text-gray-900 dark:text-white">
                      {(order.totalAmount + order.tax).toLocaleString()}₫
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders; 