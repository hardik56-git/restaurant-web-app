import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiStar, FiMinus, FiPlus, FiShoppingCart, FiArrowLeft, FiSend } from 'react-icons/fi';
import { foodAPI } from '../services/api';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const FoodDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const toast = useToast();
  
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const { data } = await foodAPI.getById(id);
        setFood(data);
        const savedReviews = localStorage.getItem(`reviews_${id}`);
        if (savedReviews) {
          setReviews(JSON.parse(savedReviews));
        } else {
          setReviews([
            { id: 1, rating: 4, comment: 'Great taste! Loved it.', date: '2024-01-15' },
            { id: 2, rating: 5, comment: 'Amazing food, highly recommended!', date: '2024-01-10' }
          ]);
        }
      } catch (error) {
        console.error('Error fetching food:', error);
        navigate('/menu');
      } finally {
        setLoading(false);
      }
    };
    fetchFood();
  }, [id, navigate]);

  const handleAddToCart = () => {
    addToCart(food, quantity);
    toast.success(`${quantity} ${food.name} added to cart!`);
    navigate('/cart');
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newReview.comment.trim()) {
      toast.error('Please write a review');
      return;
    }
    const review = {
      id: Date.now(),
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0]
    };
    const updatedReviews = [review, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem(`reviews_${id}`, JSON.stringify(updatedReviews));
    setNewReview({ rating: 5, comment: '' });
    setShowReviewForm(false);
    toast.success('Review submitted!');
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

  const calculateAverageRating = () => {
    if (reviews.length === 0) return food?.rating || 0;
    const total = reviews.reduce((sum, r) => sum + r.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark">
        <Navbar />
        <div className="pt-24 flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
        </div>
      </div>
    );
  }

  if (!food) return null;

  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-400 hover:text-gold mb-8 transition-colors"
          >
            <FiArrowLeft /> Back
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="relative rounded-xl overflow-hidden">
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-full h-96 lg:h-[500px] object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getCategoryColor(food.category)} text-white uppercase`}>
                    {food.category}
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col justify-center"
            >
              <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
                {food.name}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className={i < Math.floor(calculateAverageRating()) ? 'text-gold' : 'text-gray-600'}
                    />
                  ))}
                </div>
                <span className="text-white">{calculateAverageRating()}</span>
                <span className="text-gray-500">({reviews.length} reviews)</span>
              </div>

              <div className="text-4xl text-gold font-bold mb-6">¥{food.price}</div>

              <p className="text-gray-400 mb-8 leading-relaxed">
                {food.description}
              </p>

              <div className="flex items-center gap-4 mb-8">
                <span className="text-white">Quantity:</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg bg-dark-card border border-dark-border flex items-center justify-center text-white hover:border-gold transition-colors"
                  >
                    <FiMinus />
                  </button>
                  <span className="text-xl text-white w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg bg-dark-card border border-dark-border flex items-center justify-center text-white hover:border-gold transition-colors"
                  >
                    <FiPlus />
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!food.isAvailable}
                  className="flex-1 btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiShoppingCart /> Add to Cart - ¥{(food.price * quantity).toFixed(2)}
                </button>
              </div>

              {!food.isAvailable && (
                <p className="mt-4 text-red-500 text-center">This item is currently unavailable</p>
              )}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-16"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-heading text-2xl font-bold text-white">Reviews</h2>
              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="btn-secondary text-sm"
              >
                Write a Review
              </button>
            </div>

            {showReviewForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="card p-6 mb-8"
              >
                <h3 className="font-heading text-xl text-white mb-4">Your Review</h3>
                <form onSubmit={handleSubmitReview}>
                  <div className="mb-4">
                    <label className="block text-gray-400 mb-2">Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReview({ ...newReview, rating: star })}
                          className="text-2xl"
                        >
                          <FiStar className={star <= newReview.rating ? 'text-gold' : 'text-gray-600'} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-400 mb-2">Your Comment</label>
                    <textarea
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      placeholder="Write your review..."
                      className="w-full bg-dark-card border border-dark-border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold"
                      rows={3}
                    />
                  </div>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setShowReviewForm(false)}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn-primary flex items-center gap-2">
                      <FiSend /> Submit
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {reviews.length === 0 ? (
              <p className="text-gray-400 text-center py-8">No reviews yet. Be the first to review!</p>
            ) : (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="card p-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {[...Array(5)].map((_, i) => (
                          <FiStar
                            key={i}
                            className={i < review.rating ? 'text-gold' : 'text-gray-600'}
                          />
                        ))}
                      </div>
                      <span className="text-gray-500 text-sm">{review.date}</span>
                    </div>
                    <p className="text-white">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FoodDetails;