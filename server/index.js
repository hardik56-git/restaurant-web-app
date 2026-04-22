import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'demo-secret';

let users = [];
let foods = [
  { _id: '1', name: 'Truffle Pasta', price: 24.99, category: 'non-veg', description: 'Rich creamy pasta with black truffle', image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400', rating: 4.8, reviewCount: 120, isAvailable: true },
  { _id: '2', name: 'Caesar Salad', price: 12.99, category: 'veg', description: 'Fresh romaine with classic caesar dressing', image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400', rating: 4.5, reviewCount: 85, isAvailable: true },
  { _id: '3', name: 'Grilled Salmon', price: 28.99, category: 'non-veg', description: 'Fresh Atlantic salmon with herbs', image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400', rating: 4.9, reviewCount: 200, isAvailable: true },
  { _id: '4', name: 'Mushroom Risotto', price: 18.99, category: 'veg', description: 'Creamy arborio rice with wild mushrooms', image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400', rating: 4.7, reviewCount: 150, isAvailable: true },
  { _id: '5', name: 'Chocolate Lava Cake', price: 9.99, category: 'desserts', description: 'Warm chocolate cake with molten center', image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400', rating: 4.9, reviewCount: 300, isAvailable: true },
  { _id: '6', name: 'Mango Smoothie', price: 6.99, category: 'drinks', description: 'Fresh mango with yogurt and honey', image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400', rating: 4.6, reviewCount: 90, isAvailable: true },
  { _id: '7', name: 'Chicken Biryani', price: 16.99, category: 'non-veg', description: 'Aromatic basmati rice with spices', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400', rating: 4.8, reviewCount: 250, isAvailable: true },
  { _id: '8', name: 'Vegetable Stir Fry', price: 14.99, category: 'veg', description: 'Fresh seasonal vegetables in garlic sauce', image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400', rating: 4.4, reviewCount: 75, isAvailable: true },
];
let orders = [];
let orderIdCounter = 1;

const generateToken = (id) => jwt.sign({ id }, JWT_SECRET, { expiresIn: '7d' });

const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = users.find(u => u._id === decoded.id);
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user?.role !== 'admin') return res.status(403).json({ message: 'Admin only' });
  next();
};

app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  if (users.find(u => u.email === email)) return res.status(400).json({ message: 'User exists' });
  const user = { _id: Date.now().toString(), name, email, password: bcrypt.hashSync(password, 10), role: 'user' };
  users.push(user);
  res.json({ _id: user._id, name: user.name, email: user.email, role: user.role, token: generateToken(user._id) });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user || !bcrypt.compareSync(password, user.password)) return res.status(401).json({ message: 'Invalid credentials' });
  res.json({ _id: user._id, name: user.name, email: user.email, role: user.role, token: generateToken(user._id) });
});

app.get('/api/auth/me', protect, (req, res) => res.json({ _id: req.user._id, name: req.user.name, email: req.user.email, role: req.user.role }));

app.get('/api/foods', (req, res) => {
  let result = [...foods];
  if (req.query.category && req.query.category !== 'all') result = result.filter(f => f.category === req.query.category);
  if (req.query.search) result = result.filter(f => f.name.toLowerCase().includes(req.query.search.toLowerCase()));
  res.json(result);
});

app.get('/api/foods/:id', (req, res) => {
  const food = foods.find(f => f._id === req.params.id);
  if (!food) return res.status(404).json({ message: 'Not found' });
  res.json(food);
});

app.post('/api/foods', protect, adminOnly, (req, res) => {
  const food = { _id: Date.now().toString(), ...req.body, rating: 0, reviewCount: 0 };
  foods.push(food);
  res.status(201).json(food);
});

app.put('/api/foods/:id', protect, adminOnly, (req, res) => {
  const i = foods.findIndex(f => f._id === req.params.id);
  if (i === -1) return res.status(404).json({ message: 'Not found' });
  foods[i] = { ...foods[i], ...req.body };
  res.json(foods[i]);
});

app.delete('/api/foods/:id', protect, adminOnly, (req, res) => {
  foods = foods.filter(f => f._id !== req.params.id);
  res.json({ message: 'Deleted' });
});

app.post('/api/orders', protect, (req, res) => {
  const { items, total, paymentMethod, address } = req.body;
  const order = { _id: orderIdCounter++, userId: req.user._id, items, total, paymentMethod, address, status: 'pending', createdAt: new Date() };
  orders.push(order);
  res.status(201).json(order);
});

app.get('/api/orders/my-orders', protect, (req, res) => {
  res.json(orders.filter(o => o.userId === req.user._id));
});

app.get('/api/orders/all', protect, adminOnly, (req, res) => res.json(orders));

app.put('/api/orders/:id/status', protect, adminOnly, (req, res) => {
  const i = orders.findIndex(o => o._id === parseInt(req.params.id));
  if (i === -1) return res.status(404).json({ message: 'Not found' });
  orders[i].status = req.body.status;
  res.json(orders[i]);
});

app.get('/api', (req, res) => res.json({ message: 'Gourmet Palace API (Demo Mode)', version: '1.0.0' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));