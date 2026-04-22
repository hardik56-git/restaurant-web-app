import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Menu from './pages/Menu';
import FoodDetails from './pages/FoodDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Auth from './pages/Auth';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/food/:id" element={<FoodDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Auth />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;