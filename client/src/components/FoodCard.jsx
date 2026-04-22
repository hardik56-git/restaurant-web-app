import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiStar, FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

const FoodCard = ({ food, index = 0 }) => {
  const { addToCart } = useCart();
  const toast = useToast();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(food);
    toast.success(`${food.name} added to cart!`);
  };

  const getCategoryColor = (category) => {
    const colors = {
      veg: 'bg-green-500',
      'non-veg': 'bg-red-500',
      drinks: 'bg-blue-500',
      desserts: 'bg-pink-500'
    };
    return colors[category] || 'bg-gray-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Link to={`/food/${food._id}`} className="card group block">
        <div className="relative h-48 overflow-hidden">
          <img
            src={food.image}
            alt={food.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute top-2 right-2">
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(food.category)} text-white uppercase`}>
              {food.category}
            </span>
          </div>
          {!food.isAvailable && (
            <div className="absolute inset-0 bg-dark/70 flex items-center justify-center">
              <span className="text-red-400 font-semibold">Out of Stock</span>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-heading text-lg font-semibold text-white mb-2 group-hover:text-gold transition-colors">
            {food.name}
          </h3>
          
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1">
              <FiStar className="text-gold" />
              <span className="text-white text-sm">{food.rating.toFixed(1)}</span>
              <span className="text-gray-500 text-xs">({food.reviewCount})</span>
            </div>
            <span className="text-gold font-bold text-xl">¥{food.price}</span>
          </div>
          
          <p className="text-gray-400 text-sm line-clamp-2 mb-4">
            {food.description}
          </p>
          
          <button
            onClick={handleAddToCart}
            disabled={!food.isAvailable}
            className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiShoppingCart /> Add 
          </button>
        </div>
      </Link>
    </motion.div>
  );
};

export default FoodCard;