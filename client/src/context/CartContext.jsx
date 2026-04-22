import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

const CART_STORAGE_KEY = 'gourmet_palace_cart';

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        setCart([]);
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }
  }, [cart, loading]);

  const addToCart = (food, quantity = 1) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item._id === food._id);
      if (existingItem) {
        return prev.map((item) =>
          item._id === food._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...food, quantity }];
    });
  };

  const removeFromCart = (foodId) => {
    setCart((prev) => prev.filter((item) => item._id !== foodId));
  };

  const updateQuantity = (foodId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(foodId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item._id === foodId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};