import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMinus, FiPlus, FiTrash2, FiShoppingCart, FiArrowRight } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-dark">
        <Navbar />
        <div className="pt-24 flex flex-col items-center justify-center min-h-screen">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <FiShoppingCart className="text-6xl text-gray-600 mx-auto mb-4" />
            <h2 className="text-2xl text-white mb-4">Your cart is empty</h2>
            <p className="text-gray-400 mb-8">Looks like you haven't added any dishes yet.</p>
            <Link to="/menu" className="btn-primary inline-flex items-center gap-2">
              Browse Menu <FiArrowRight />
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-3xl sm:text-4xl font-bold text-white mb-8"
          >
            Your <span className="text-gold">Cart</span>
          </motion.h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <AnimatePresence>
                {cart.map((item) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    className="card flex gap-4 p-4 mb-4"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-heading text-lg text-white">{item.name}</h3>
                          <p className="text-gold font-bold">¥{item.price}</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="text-red-500 hover:text-red-400 transition-colors"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                            className="w-8 h-8 rounded bg-dark-border flex items-center justify-center text-white hover:text-gold"
                          >
                            <FiMinus />
                          </button>
                          <span className="text-white w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                            className="w-8 h-8 rounded bg-dark-border flex items-center justify-center text-white hover:text-gold"
                          >
                            <FiPlus />
                          </button>
                        </div>
                        <span className="text-white font-semibold">
                          ¥{(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div>
              <div className="card p-6 sticky top-24">
                <h3 className="font-heading text-xl text-white mb-4">Order Summary</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-400">
                    <span>Total ({cart.length} items)</span>
                    <span>¥{getCartTotal().toFixed(2)}</span>
                  </div>
                </div>

                <div className="border-t border-dark-border pt-4 mb-6">
                  <div className="flex justify-between text-white text-xl font-bold">
                    <span>Total</span>
                    <span className="text-gold">¥{getCartTotal().toFixed(2)}</span>
                  </div>
                </div>

                <Link
                  to="/checkout"
                  className="w-full btn-primary flex items-center justify-center gap-2"
                >
                  Proceed to Checkout <FiArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;