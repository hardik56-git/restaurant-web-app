import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Input from '../components/Input';
import Button from '../components/Button';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const location = useLocation();
  const { login, register } = useAuth();
  const toast = useToast();

  const from = location.state?.from?.pathname || '/';

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!isLogin && !formData.name) newErrors.name = 'Name is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      let result;
      if (isLogin) {
        result = await login(formData.email, formData.password);
      } else {
        result = await register(formData.name, formData.email, formData.password);
      }

      if (result.success) {
        toast.success(isLogin ? 'Welcome back!' : 'Account created successfully!');
        navigate(from, { replace: true });
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link to="/" className="font-heading text-3xl font-bold text-gold">
            Gourmet Palace
          </Link>
          <p className="text-gray-400 mt-2">
            {isLogin ? 'Welcome back!' : 'Create your account'}
          </p>
        </div>

        <div className="card p-8">
          <h1 className="font-heading text-2xl font-bold text-white mb-6 text-center">
            {isLogin ? 'Login' : 'Register'}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full bg-dark-card border border-dark-border rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>
            )}

            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full bg-dark-card border border-dark-border rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full bg-dark-card border border-dark-border rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Loading...' : isLogin ? 'Login' : 'Register'}
            </Button>
          </form>

          <p className="text-center text-gray-400 mt-6">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              onClick={toggleMode}
              className="text-gold hover:text-gold-hover"
            >
              {isLogin ? 'Register' : 'Login'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;