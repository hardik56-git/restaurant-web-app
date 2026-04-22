import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiStar } from 'react-icons/fi';
import { foodAPI } from '../services/api';
import FoodCard from '../components/FoodCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
  const [featuredFoods, setFeaturedFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const { data } = await foodAPI.getAll({ isAvailable: true });
        setFeaturedFoods(data.slice(0, 6));
      } catch (error) {
        console.error('Error fetching foods:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFoods();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920"
            alt="Restaurant background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark/70 via-dark/50 to-dark"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4 max-w-4xl"
        >
          <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
            Welcome to <span className="text-gold">Gourmet Palace</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Experience the finest culinary arts. Every dish tells a story of passion, 
            tradition, and innovation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/menu" className="btn-primary inline-flex items-center justify-center gap-2">
              View Menu <FiArrowRight />
            </Link>
            <Link to="/login" className="btn-secondary inline-flex items-center justify-center gap-2">
              Order Now
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="py-20 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
              Dishes
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Discover our chef's most celebrated creations, crafted with love and the finest ingredients.
            </p>
          </motion.div>

          {loading ? (
            <LoadingSkeleton count={6} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredFoods.map((food, index) => (
                <FoodCard key={food._id} food={food} index={index} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/menu" className="btn-secondary inline-flex items-center gap-2">
              Explore Full Menu <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-dark-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center p-8"
            >
              <div className="text-5xl text-gold font-heading font-bold mb-2">500+</div>
              <div className="text-gray-400">Happy Customers</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center p-8"
            >
              <div className="text-5xl text-gold font-heading font-bold mb-2">50+</div>
              <div className="text-gray-400">Signature Dishes</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-center p-8"
            >
              <div className="flex justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className="text-gold text-3xl" />
                ))}
              </div>
              <div className="text-gray-400">5-Star Rating</div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;