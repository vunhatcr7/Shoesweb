import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserIcon, LockClosedIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const illustration = '/images/login.jpg';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  // State cho form login
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  // State cho form register
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirm, setRegConfirm] = useState('');
  const [regError, setRegError] = useState('');
  const [regLoading, setRegLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);
    if (!loginEmail || !loginPassword) {
      setLoginError('Please enter both email and password.');
      setLoginLoading(false);
      return;
    }
    setTimeout(() => {
      setLoginLoading(false);
      toast.success('Đăng nhập thành công!');
      navigate('/');
    }, 1000);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setRegError('');
    setRegLoading(true);
    if (!regName || !regEmail || !regPassword || !regConfirm) {
      setRegError('Please fill in all fields.');
      setRegLoading(false);
      return;
    }
    if (regPassword !== regConfirm) {
      setRegError('Passwords do not match.');
      setRegLoading(false);
      return;
    }
    setTimeout(() => {
      setRegLoading(false);
      alert('Register success (demo)!');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-white to-purple-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500">
      <div className="relative w-full max-w-4xl min-h-[600px] grid grid-cols-1 md:grid-cols-2 rounded-3xl shadow-2xl overflow-hidden bg-white dark:bg-gray-900">
        {/* Hình minh họa: animate sang trái/phải */}
        <motion.div
          animate={{ x: isLogin ? 0 : '-100%' }}
          transition={{ type: 'spring', stiffness: 80, damping: 20 }}
          className="hidden md:flex flex-col items-center justify-center p-10 bg-gradient-to-br from-purple-500 to-pink-400 dark:from-gray-800 dark:to-gray-900 absolute top-0 bottom-0 right-0 w-1/2 z-10"
          style={{ borderRadius: isLogin ? '0 24px 24px 0' : '24px 0 0 24px' }}
        >
          <img src={illustration} alt="Auth" className="w-full max-w-x mb-8 rounded-2xl shadow-xl" />

        </motion.div>
        {/* Form: login ở trái, register ở phải */}
        <div className="flex items-center justify-center p-8 min-h-[660px] col-span-2 md:col-span-1 md:col-start-1 relative z-20">
          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.div
                key="login"
                initial={{ x: 80, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -80, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 80, damping: 20 }}
                className="w-full max-w-md"
              >
                <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-900 dark:text-white tracking-tight">Sign In</h2>
                {loginError && <div className="mb-4 text-red-600 text-sm text-center animate-shake">{loginError}</div>}
                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-1 font-medium">Email</label>
                    <div className="relative">
                      <input
                        type="email"
                        className="input w-full pl-12 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 dark:focus:ring-primary-900 transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        value={loginEmail}
                        onChange={e => setLoginEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                      />
                      <UserIcon className="h-5 w-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none transition-colors duration-300" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-1 font-medium">Password</label>
                    <div className="relative">
                      <input
                        type="password"
                        className="input w-full pl-12 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 dark:focus:ring-primary-900 transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        value={loginPassword}
                        onChange={e => setLoginPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                      />
                      <LockClosedIcon className="h-5 w-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none transition-colors duration-300" />
                    </div>
                    <button
                      type="button"
                      className="block text-sm text-primary-600 dark:text-primary-400 hover:underline mt-4 mb-4 ml-auto"
                      style={{ float: 'right' }}
                      onClick={() => alert('Chức năng quên mật khẩu sẽ được cập nhật!')}
                    >
                      Quên mật khẩu?
                    </button>
                  </div>
                  <button type="submit" className="btn btn-primary w-full py-3 rounded-xl text-lg font-bold flex items-center justify-center gap-2 disabled:opacity-60 bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white transition-all duration-300" disabled={loginLoading}>
                    {loginLoading && <span className="loader border-white border-2 border-t-primary-600 mr-2"></span>}
                    Sign In
                  </button>
                </form>
                {/* Social login icons dưới nút Sign In */}
                <div className="flex items-center justify-center gap-4 mt-6">
                  <button
                    type="button"
                    className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow hover:bg-gray-100 dark:hover:bg-gray-600 transition"
                    onClick={() => alert('Login with Google (demo)!')}
                  >
                    <img src="/images/googlelogo.webp" alt="Google" className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow hover:bg-gray-100 dark:hover:bg-gray-600 transition"
                    onClick={() => alert('Login with Facebook (demo)!')}
                  >
                    <img src="/images/fblogo.webp" alt="Facebook" className="h-7 w-7" />
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow hover:bg-gray-100 dark:hover:bg-gray-600 transition"
                    onClick={() => alert('Login with Apple (demo)!')}
                  >
                    <img src="/images/applelogo.jpg" alt="Github" className="h-5 w-5" />
                  </button>
                </div>
                <button
                  className="mt-8 w-full text-primary-600 dark:text-primary-400 hover:underline font-semibold"
                  onClick={() => setIsLogin(false)}
                >
                  Don&apos;t have an account? Sign Up
                </button>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
        <div className="flex items-center justify-center p-8 col-span-2 md:col-span-1 md:col-start-2 relative z-20">
          <AnimatePresence mode="wait">
            {!isLogin ? (
              <motion.div
                key="register"
                initial={{ x: 80, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -80, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 80, damping: 20 }}
                className="w-full max-w-md"
              >
                <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-900 dark:text-white tracking-tight">Sign Up</h2>
                {regError && <div className="mb-4 text-red-600 text-sm text-center animate-shake">{regError}</div>}
                <form onSubmit={handleRegister} className="space-y-6">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-1 font-medium">Name</label>
                    <div className="relative">
                      <input
                        type="text"
                        className="input w-full pl-12 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 dark:focus:ring-primary-900 transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        value={regName}
                        onChange={e => setRegName(e.target.value)}
                        placeholder="Enter your name"
                        required
                      />
                      <UserIcon className="h-5 w-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none transition-colors duration-300" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-1 font-medium">Email</label>
                    <div className="relative">
                      <input
                        type="email"
                        className="input w-full pl-12 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 dark:focus:ring-primary-900 transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        value={regEmail}
                        onChange={e => setRegEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                      />
                      <EnvelopeIcon className="h-5 w-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none transition-colors duration-300" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-1 font-medium">Password</label>
                    <div className="relative">
                      <input
                        type="password"
                        className="input w-full pl-12 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 dark:focus:ring-primary-900 transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        value={regPassword}
                        onChange={e => setRegPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                      />
                      <LockClosedIcon className="h-5 w-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none transition-colors duration-300" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-1 font-medium">Confirm Password</label>
                    <div className="relative">
                      <input
                        type="password"
                        className="input w-full pl-12 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 dark:focus:ring-primary-900 transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        value={regConfirm}
                        onChange={e => setRegConfirm(e.target.value)}
                        placeholder="Confirm your password"
                        required
                      />
                      <LockClosedIcon className="h-5 w-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none transition-colors duration-300" />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary w-full py-3 rounded-xl text-lg font-bold flex items-center justify-center gap-2 disabled:opacity-60 bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white transition-all duration-300" disabled={regLoading}>
                    {regLoading && <span className="loader border-white border-2 border-t-primary-600 mr-2"></span>}
                    Sign Up
                  </button>
                </form>
                <button
                  className="mt-8 w-full text-primary-600 dark:text-primary-400 hover:underline font-semibold"
                  onClick={() => setIsLogin(true)}
                >
                  Already have an account? Sign In
                </button>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AuthPage; 