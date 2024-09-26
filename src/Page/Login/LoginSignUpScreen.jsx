import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginSignUpScreen = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault(); // Prevent default form submission
    // You can add your authentication logic here

    // Redirect based on the form type
    if (isLogin) {
      // Redirect to listings after login
      navigate('/listings');
    } else {
      // Redirect to home after sign-up
      navigate('/');
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-[#3951BA]'>
      <motion.div
        className='bg-white rounded-lg shadow-lg mx-2 md:mx-0 p-8 max-w-sm w-full'
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className='text-center text-2xl font-bold mb-6 text-[#3951BA]'>
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className='mb-4 '>
              <label className='block text-gray-700 mb-2' htmlFor='username'>
                Username
              </label>
              <input
                type='text'
                id='username'
                className='w-full p-2 border border-gray-300 rounded'
                placeholder='Enter your username'
                required
              />
            </div>
          )}
          <div className='mb-4'>
            <label className='block text-gray-700 mb-2' htmlFor='email'>
              Email
            </label>
            <input
              type='email'
              id='email'
              className='w-full p-2 border border-gray-300 rounded'
              placeholder='Enter your email'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 mb-2' htmlFor='password'>
              Password
            </label>
            <input
              type='password'
              id='password'
              className='w-full p-2 border border-gray-300 rounded'
              placeholder='Enter your password'
              required
            />
          </div>
          {!isLogin && (
            <div className='mb-4'>
              <label
                className='block text-gray-700 mb-2'
                htmlFor='confirm-password'
              >
                Confirm Password
              </label>
              <input
                type='password'
                id='confirm-password'
                className='w-full p-2 border border-gray-300 rounded'
                placeholder='Confirm your password'
                required
              />
            </div>
          )}

          <motion.button
            type='submit'
            className='w-full py-2 bg-[#3951BA] text-white rounded hover:bg-blue-600 transition duration-200'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </motion.button>
        </form>

        <div className='text-center mt-4'>
          <span className='text-gray-700'>
            {isLogin ? 'Don’t have an account? ' : 'Already have an account? '}
            <Link
              to='#'
              className='text-[#3951BA] font-semibold'
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </Link>
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginSignUpScreen;
