import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter } from 'react-icons/fi';
import { foodAPI } from '../services/api';
import FoodCard from '../components/FoodCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const categories = [
  { id: 'all', label: 'All' },
  { id: 'veg', label: 'Vegetarian' },
  { id: 'non-veg', label: 'Non-Veg' },
  { id: 'drinks', label: 'Drinks' },
  { id: 'desserts', label: 'Desserts' }
];

const Menu = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchFoods = async () => {
      setLoading(true);
      try {
        const params = {};
        if (category !== 'all') params.category = category;
        if (search) params.search = search;
        
        const { data } = await foodAPI.getAll(params);
        setFoods(data);
      } catch (error) {
        console.error('Error fetching foods:', error);
      } finally {
        setLoading(false);
      }
    };
    
    const debounce = setTimeout(() => {
      fetchFoods();
    }, 300);
    
    return () => clearTimeout(debounce);
  }, [category, search]);

  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4">
              Our <span className="text-gold">Menu</span>
            </h1>
            <p className="text-gray-400 max-w-xl mx-auto">
              Explore our diverse selection of dishes, crafted with the finest ingredients 
              and prepared with passion.
            </p>
          </motion.div>

          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCategory(cat.id)}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      category === cat.id
                        ? 'bg-gold text-dark'
                        : 'bg-dark-card text-white hover:bg-dark-border'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-80">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search dishes..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-dark-card border border-dark-border rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-gold"
                />
              </div>
            </div>
          </div>

          {loading ? (
            <LoadingSkeleton count={6} />
          ) : foods.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {foods.map((food, index) => (
                <FoodCard key={food._id} food={food} index={index} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <FiFilter className="text-6xl text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl text-white mb-2">No dishes found</h3>
              <p className="text-gray-400">Try adjusting your search or filter criteria</p>
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Menu;