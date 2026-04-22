import { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiX, FiAlertTriangle, FiInfo } from 'react-icons/fi';

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

const toastIcons = {
  success: FiCheck,
  error: FiX,
  warning: FiAlertTriangle,
  info: FiInfo
};

const toastStyles = {
  success: 'bg-green-500/20 border-green-500 text-green-400',
  error: 'bg-red-500/20 border-red-500 text-red-400',
  warning: 'bg-yellow-500/20 border-yellow-500 text-yellow-400',
  info: 'bg-blue-500/20 border-blue-500 text-blue-400'
};

const ToastItem = ({ toast, onClose }) => {
  const Icon = toastIcons[toast.type];
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg border ${toastStyles[toast.type]} mb-2`}
    >
      <Icon className="text-xl" />
      <span className="flex-1 text-sm">{toast.message}</span>
      <button onClick={() => onClose(toast.id)} className="hover:opacity-70">
        <FiX />
      </button>
    </motion.div>
  );
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const toast = {
    success: (msg) => addToast(msg, 'success'),
    error: (msg) => addToast(msg, 'error'),
    warning: (msg) => addToast(msg, 'warning'),
    info: (msg) => addToast(msg, 'info')
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="fixed top-20 right-4 z-50 max-w-sm w-full">
        <AnimatePresence>
          {toasts.map((toast) => (
            <ToastItem key={toast.id} toast={toast} onClose={removeToast} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};