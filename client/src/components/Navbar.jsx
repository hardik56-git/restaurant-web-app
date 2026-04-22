import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { getCartCount } = useCart();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark/95 backdrop-blur-md border-b border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          <Link to="/" className="font-heading text-2xl font-bold text-gold flex items-center gap-2">
            <span className="text-3xl"></span>
          
          </Link>

          <div className="hidden md:flex items-center ml-8 gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-white hover:text-gold transition-colors text-lg"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <Link to="/cart" className="relative p-2 text-white hover:text-gold transition-colors">
              <FiShoppingBag className="text-xl" />
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-dark text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-white"
            >
              {isOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark-secondary border-t border-dark-border"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block py-2 text-white hover:text-gold transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;