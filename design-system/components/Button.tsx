import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  role?: 'student' | 'faculty' | 'admin';
}

const cn = (...inputs: Parameters<typeof clsx>) => twMerge(clsx(inputs));

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  role,
  className,
  disabled,
  ...props
}) => {
  const baseClasses = cn(
    'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-50 disabled:pointer-events-none',
    {
      // Size variants
      'px-3 py-2 text-sm': size === 'sm',
      'px-4 py-2.5 text-sm': size === 'md',
      'px-6 py-3 text-base': size === 'lg',
      
      // Color variants
      'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500': variant === 'primary' && !role,
      'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500': variant === 'secondary',
      'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-primary-500': variant === 'outline',
      'text-gray-700 hover:bg-gray-100 focus:ring-gray-500': variant === 'ghost',
      'bg-error-600 text-white hover:bg-error-700 focus:ring-error-500': variant === 'danger',
      
      // Role-specific colors
      'bg-role-student-600 text-white hover:bg-role-student-700 focus:ring-role-student-500': variant === 'primary' && role === 'student',
      'bg-role-faculty-600 text-white hover:bg-role-faculty-700 focus:ring-role-faculty-500': variant === 'primary' && role === 'faculty',
      'bg-role-admin-600 text-white hover:bg-role-admin-700 focus:ring-role-admin-500': variant === 'primary' && role === 'admin'
    },
    className
  );

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={baseClasses}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {!loading && icon && <span className="mr-2">{icon}</span>}
      {children}
    </motion.button>
  );
};