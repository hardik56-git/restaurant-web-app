import Order from '../models/Order.js';

export const createOrder = async (req, res, next) => {
  try {
    const { items, total, paymentMethod, address } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No items in order' });
    }

    const order = await Order.create({
      userId: req.user._id,
      items,
      total,
      paymentMethod,
      address
    });

    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ userId: req.user._id })
      .populate('items.foodId', 'name image')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate('userId', 'name email')
      .populate('items.foodId', 'name image')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).populate('userId', 'name email');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    next(error);
  }
};