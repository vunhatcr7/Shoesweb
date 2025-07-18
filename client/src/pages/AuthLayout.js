import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const illustration = '/images/bglogin.jpg'; // Đổi thành ảnh bạn muốn

const AuthLayout = ({ children }) => {
  const location = useLocation();
  const isLogin = location.pathname === '/login';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-white to-purple-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500">
      <div className={`relative w-full max-w-4xl min-h-[600px] flex rounded-3xl shadow-2xl overflow-hidden bg-white dark:bg-gray-900 ${isLogin ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Hình minh họa */}
        <AnimatePresence mode="wait">
          <motion.div
            key={isLogin ? 'login-img' : 'register-img'}
            initial={{ x: isLogin ? '100%' : '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: isLogin ? '-100%' : '100%' }}
            transition={{ type: 'spring', stiffness: 80, damping: 20 }}
            className={`w-1/2 hidden md:flex flex-col items-center justify-center p-10 bg-gradient-to-br from-purple-500 to-pink-400 dark:from-gray-800 dark:to-gray-900`}
            style={{ borderRadius: isLogin ? '0 24px 24px 0' : '24px 0 0 24px' }}
          >
            <img src={illustration} alt="Auth" className="w-full max-w-xs mb-8 rounded-2xl shadow-xl" />
            <h2 className="text-3xl font-bold text-white mb-4 text-left">Exploring new frontiers, one step at a Time.</h2>
            <p className="text-white/80">Beyond Earth's grasp</p>
          </motion.div>
        </AnimatePresence>
        {/* Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout; 