import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import Input from '../components/Input';
import Button from '../components/Button';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const toast = useToast();
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    tableNumber: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.tableNumber) newErrors.tableNumber = 'Table number is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setTimeout(() => {
      clearCart();
      toast.success(`Order placed successfully! Table: ${formData.tableNumber}`);
      window.location.href = '/';
      setLoading(false);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-dark">
        <Navbar />
        <div className="pt-24 flex flex-col items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl text-white mb-4">Your cart is empty</h2>
            <Link to="/menu" className="btn-primary">Browse Menu</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-gold mb-8 transition-colors"
          >
            <FiArrowLeft /> Back to Cart
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h1 className="font-heading text-3xl font-bold text-white mb-8">
                  Checkout
                </h1>

                <form onSubmit={handleSubmit}>
                  <div className="card p-6 mb-6">
                    <h3 className="font-heading text-xl text-white mb-4">Order Details</h3>
                    <div className="space-y-4">
                      <Input
                        label="Your Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        error={errors.name}
                        placeholder="John Doe"
                      />
                      <Input
                        label="Table Number"
                        name="tableNumber"
                        value={formData.tableNumber}
                        onChange={handleChange}
                        error={errors.tableNumber}
                        placeholder="e.g., 5"
                        type="number"
                      />
                    </div>
                  </div>
                </form>
              </motion.div>
            </div>

            <div>
              <div className="card p-6 sticky top-24">
                <h3 className="font-heading text-xl text-white mb-4">Order Summary</h3>
                <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                  {cart.map(item => (
                    <div key={item._id} className="flex justify-between text-sm">
                      <span className="text-gray-400">{item.name} x{item.quantity}</span>
                      <span className="text-white">¥{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-dark-border pt-4">
                  <div className="flex justify-between text-white text-xl font-bold">
                    <span>Total</span>
                    <span className="text-gold">¥{getCartTotal().toFixed(2)}</span>
                  </div>
                </div>
                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full mt-6"
                >
                  {loading ? 'Processing Order...' : 'Place Order'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;