import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  disabled = false,
  onClick,
  type = 'button',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold px-6 py-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-gold hover:bg-gold-hover text-dark hover:scale-105',
    secondary: 'bg-transparent border-2 border-gold text-gold hover:bg-gold hover:text-dark',
    outline: 'bg-transparent border border-dark-border text-white hover:border-gold hover:text-gold'
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;