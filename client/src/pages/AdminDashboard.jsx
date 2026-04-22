import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiShoppingBag, FiUsers, FiDollarSign } from 'react-icons/fi';
import { foodAPI, orderAPI } from '../services/api';
import { useToast } from '../context/ToastContext';
import Navbar from '../components/Navbar';
import Input from '../components/Input';
import Button from '../components/Button';

const categories = ['veg', 'non-veg', 'drinks', 'desserts'];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('foods');
  const [foods, setFoods] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingFood, setEditingFood] = useState(null);
  const [foodForm, setFoodForm] = useState({
    name: '',
    price: '',
    category: 'veg',
    description: '',
    image: '',
    isAvailable: true
  });
  
  const toast = useToast();

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'foods') {
        const { data } = await foodAPI.getAll();
        setFoods(data);
      } else if (activeTab === 'orders') {
        const { data } = await orderAPI.getAllOrders();
        setOrders(data);
      }
    } catch (error) {
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFood = async (id) => {
    if (!confirm('Are you sure you want to delete this food?')) return;
    try {
      await foodAPI.delete(id);
      toast.success('Food deleted successfully');
      setFoods(foods.filter(f => f._id !== id));
    } catch (error) {
      toast.error('Failed to delete food');
    }
  };

  const handleSaveFood = async (e) => {
    e.preventDefault();
    try {
      if (editingFood) {
        await foodAPI.update(editingFood._id, foodForm);
        toast.success('Food updated successfully');
      } else {
        await foodAPI.create(foodForm);
        toast.success('Food created successfully');
      }
      setShowModal(false);
      setEditingFood(null);
      fetchData();
    } catch (error) {
      toast.error('Failed to save food');
    }
  };

  const handleUpdateStatus = async (orderId, status) => {
    try {
      await orderAPI.updateStatus(orderId, status);
      toast.success('Order status updated');
      fetchData();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const openModal = (food = null) => {
    if (food) {
      setEditingFood(food);
      setFoodForm({
        name: food.name,
        price: food.price.toString(),
        category: food.category,
        description: food.description || '',
        image: food.image,
        isAvailable: food.isAvailable
      });
    } else {
      setEditingFood(null);
      setFoodForm({
        name: '',
        price: '',
        category: 'veg',
        description: '',
        image: '',
        isAvailable: true
      });
    }
    setShowModal(true);
  };

  const getCategoryBadge = (category) => {
    const colors = {
      veg: 'bg-green-500',
      'non-veg': 'bg-red-500',
      drinks: 'bg-blue-500',
      desserts: 'bg-pink-500'
    };
    return colors[category] || 'bg-gray-500';
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-yellow-500',
      confirmed: 'bg-blue-500',
      preparing: 'bg-purple-500',
      delivered: 'bg-green-500',
      cancelled: 'bg-red-500'
    };
    return styles[status] || 'bg-gray-500';
  };

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
            Admin <span className="text-gold">Dashboard</span>
          </motion.h1>

          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setActiveTab('foods')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'foods' ? 'bg-gold text-dark' : 'bg-dark-card text-white hover:text-gold'
              }`}
            >
              <FiShoppingBag className="inline mr-2" /> Foods
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'orders' ? 'bg-gold text-dark' : 'bg-dark-card text-white hover:text-gold'
              }`}
            >
              <FiDollarSign className="inline mr-2" /> Orders
            </button>
          </div>

          {activeTab === 'foods' && (
            <div>
              <Button onClick={() => openModal()} className="mb-6">
                <FiPlus className="inline mr-2" /> Add Food
              </Button>

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="card h-64 skeleton" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence>
                    {foods.map((food) => (
                      <motion.div
                        key={food._id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="card p-4"
                      >
                        <div className="flex gap-4">
                          <img
                            src={food.image}
                            alt={food.name}
                            className="w-20 h-20 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h3 className="font-heading text-white">{food.name}</h3>
                              <span className={`px-2 py-0.5 text-xs rounded-full ${getCategoryBadge(food.category)} text-white`}>
                                {food.category}
                              </span>
                            </div>
                            <p className="text-gold font-bold">¥{food.price}</p>
                            <p className={`text-sm ${food.isAvailable ? 'text-green-500' : 'text-red-500'}`}>
                              {food.isAvailable ? 'Available' : 'Unavailable'}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <button
                            onClick={() => openModal(food)}
                            className="flex-1 btn-secondary py-1 text-sm"
                          >
                            <FiEdit2 className="inline mr-1" /> Edit
                          </button>
                          <button
                            onClick={() => handleDeleteFood(food._id)}
                            className="flex-1 bg-red-500/20 text-red-500 border border-red-500 py-1 rounded hover:bg-red-500 hover:text-white transition-colors text-sm"
                          >
                            <FiTrash2 className="inline mr-1" /> Delete
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
          )}

          {activeTab === 'orders' && (
            <div>
              {loading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="card h-24 skeleton" />
                  ))}
                </div>
              ) : orders.length === 0 ? (
                <div className="text-center py-12">
                  <FiDollarSign className="text-6xl text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl text-white">No orders yet</h3>
                </div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence>
                    {orders.map((order) => (
                      <motion.div
                        key={order._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="card p-4"
                      >
                        <div className="flex flex-wrap justify-between items-start gap-4">
                          <div>
                            <p className="text-white font-medium">Order #{order._id.slice(-8)}</p>
                            <p className="text-gray-400 text-sm">
                              {order.userId?.name} • {order.userId?.email}
                            </p>
                            <p className="text-gray-400 text-sm">
                              {order.items?.length} items • ¥{order.total}
                            </p>
                            <p className="text-gray-400 text-sm">
                              {order.address?.street}, {order.address?.city} {order.address?.zipCode}
                            </p>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <span className={`px-3 py-1 rounded-full text-white text-sm ${getStatusBadge(order.status)}`}>
                              {order.status}
                            </span>
                            <div className="flex gap-2">
                              {order.status === 'pending' && (
                                <button
                                  onClick={() => handleUpdateStatus(order._id, 'confirmed')}
                                  className="text-blue-500 hover:text-blue-400 text-sm"
                                >
                                  Confirm
                                </button>
                              )}
                              {order.status === 'confirmed' && (
                                <button
                                  onClick={() => handleUpdateStatus(order._id, 'preparing')}
                                  className="text-purple-500 hover:text-purple-400 text-sm"
                                >
                                  Preparing
                                </button>
                              )}
                              {order.status === 'preparing' && (
                                <button
                                  onClick={() => handleUpdateStatus(order._id, 'delivered')}
                                  className="text-green-500 hover:text-green-400 text-sm"
                                >
                                  Delivered
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-dark/80 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="card p-6 w-full max-w-lg"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-heading text-2xl text-white">
                  {editingFood ? 'Edit Food' : 'Add Food'}
                </h2>
                <button onClick={() => setShowModal(false)}>
                  <FiX className="text-white text-xl" />
                </button>
              </div>

              <form onSubmit={handleSaveFood} className="space-y-4">
                <Input
                  label="Name"
                  value={foodForm.name}
                  onChange={(e) => setFoodForm({ ...foodForm, name: e.target.value })}
                  required
                />
                <Input
                  label="Price"
                  type="number"
                  value={foodForm.price}
                  onChange={(e) => setFoodForm({ ...foodForm, price: e.target.value })}
                  required
                />
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                  <select
                    value={foodForm.category}
                    onChange={(e) => setFoodForm({ ...foodForm, category: e.target.value })}
                    className="w-full bg-dark-card border border-dark-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <Input
                  label="Image URL"
                  value={foodForm.image}
                  onChange={(e) => setFoodForm({ ...foodForm, image: e.target.value })}
                  placeholder="https://..."
                />
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                  <textarea
                    value={foodForm.description}
                    onChange={(e) => setFoodForm({ ...foodForm, description: e.target.value })}
                    className="w-full bg-dark-card border border-dark-border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold"
                    rows={3}
                  />
                </div>
                <label className="flex items-center gap-2 text-white">
                  <input
                    type="checkbox"
                    checked={foodForm.isAvailable}
                    onChange={(e) => setFoodForm({ ...foodForm, isAvailable: e.target.checked })}
                    className="w-4 h-4 text-gold"
                  />
                  Available
                </label>
                <div className="flex gap-4">
                  <Button type="button" onClick={() => setShowModal(false)} variant="secondary" className="flex-1">
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1">
                    Save
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;