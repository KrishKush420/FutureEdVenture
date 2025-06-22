import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

const cn = (...inputs: Parameters<typeof clsx>) => twMerge(clsx(inputs));

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  hover = false,
  className,
  ...props
}) => {
  const baseClasses = cn(
    'bg-white rounded-xl transition-all duration-200',
    {
      // Variant styles
      'shadow-sm border border-gray-200': variant === 'default',
      'border-2 border-gray-200': variant === 'bordered',
      'shadow-lg': variant === 'elevated',
      
      // Padding styles
      'p-0': padding === 'none',
      'p-4': padding === 'sm',
      'p-6': padding === 'md',
      'p-8': padding === 'lg',
      
      // Hover effects
      'hover:shadow-md hover:-translate-y-1': hover && variant !== 'elevated',
      'hover:shadow-xl hover:-translate-y-1': hover && variant === 'elevated'
    },
    className
  );

  const Component = hover ? motion.div : 'div';
  const motionProps = hover ? {
    whileHover: { scale: 1.02 },
    transition: { type: 'spring', stiffness: 300, damping: 20 }
  } : {};

  return (
    <Component className={baseClasses} {...motionProps} {...props}>
      {children}
    </Component>
  );
};

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => (
  <div className={cn('mb-4', className)} {...props}>
    {children}
  </div>
);

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className,
  ...props
}) => (
  <h3 className={cn('text-lg font-semibold text-gray-900', className)} {...props}>
    {children}
  </h3>
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => (
  <div className={cn('text-gray-600', className)} {...props}>
    {children}
  </div>
);