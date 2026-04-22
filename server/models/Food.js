import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Food name is required'],
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [100, 'Name cannot exceed 100 characters'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['veg', 'non-veg', 'drinks', 'desserts']
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters'],
    trim: true
  },
  image: {
    type: String,
    default: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Food = mongoose.model('Food', foodSchema);

export default Food;