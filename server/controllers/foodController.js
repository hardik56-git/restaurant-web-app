import Food from '../models/Food.js';

export const getFoods = async (req, res, next) => {
  try {
    const { category, search, isAvailable } = req.query;
    let query = {};

    if (category && category !== 'all') {
      query.category = category;
    }

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    if (isAvailable !== undefined) {
      query.isAvailable = isAvailable === 'true';
    }

    const foods = await Food.find(query).sort({ createdAt: -1 });
    res.json(foods);
  } catch (error) {
    next(error);
  }
};

export const getFoodById = async (req, res, next) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }
    res.json(food);
  } catch (error) {
    next(error);
  }
};

export const createFood = async (req, res, next) => {
  try {
    const { name, price, category, description, image, isAvailable } = req.body;

    const food = await Food.create({
      name,
      price,
      category,
      description,
      image,
      isAvailable: isAvailable ?? true
    });

    res.status(201).json(food);
  } catch (error) {
    next(error);
  }
};

export const updateFood = async (req, res, next) => {
  try {
    const food = await Food.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }

    res.json(food);
  } catch (error) {
    next(error);
  }
};

export const deleteFood = async (req, res, next) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id);

    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }

    res.json({ message: 'Food deleted successfully' });
  } catch (error) {
    next(error);
  }
};