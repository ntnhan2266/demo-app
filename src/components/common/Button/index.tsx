import React, { ReactNode } from 'react';
import classNames from 'classnames';

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string | ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost' | 'info' | 'warning' | 'light' | 'dark' | 'link';
  fullWidth?: boolean;
  size?: 'small' | 'medium' | 'large';
  outline?: boolean;
  disabled?: boolean;
}

const Button: React.FC<IProps> = ({
  onClick,
  label,
  variant = 'primary',
  disabled = false,
  fullWidth = false,
  size = 'medium',
  outline = false,
  className = '',
  ...props
}): React.ReactElement => {
  const buttonClasses = classNames(
    'rounded-md focus:outline-none',
    className,
    {
      'w-full': fullWidth,
      'cursor-not-allowed opacity-50': disabled,
      'text-white': !outline,
      'bg-transparent text-gray-600 border border-gray-500 hover:bg-gray-200': outline,
      'text-xs px-2 py-1': size === 'small',
      'text-base px-4 py-2': size === 'medium',
      'text-lg px-6 py-3': size === 'large',
      'bg-indigo-500 hover:bg-indigo-600': variant === 'primary' && !disabled && !outline,
      'bg-gray-500 hover:bg-gray-600': variant === 'secondary' && !disabled && !outline,
      'bg-green-500 hover:bg-green-600': variant === 'success' && !disabled && !outline,
      'bg-red-500 hover:bg-red-600': variant === 'danger' && !disabled && !outline,
      'bg-yellow-500 hover:bg-yellow-600': variant === 'warning' && !disabled && !outline,
      'bg-blue-200 hover:bg-blue-300': variant === 'info' && !disabled && !outline,
      'bg-gray-300 hover:bg-gray-400': variant === 'light' && !disabled && !outline,
      'bg-gray-800 text-white hover:bg-gray-700': variant === 'dark' && !disabled && !outline,
      'underline text-indigo-500 hover:text-indigo-600': variant === 'link' && !disabled && !outline,
    },
  );

  return (
    <button type="button" onClick={onClick} className={buttonClasses} disabled={disabled} {...props}>
      {label}
    </button>
  );
};

export default Button;
