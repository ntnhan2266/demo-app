import React, { ReactNode } from 'react';
import classNames from 'classnames';

interface IProps extends React.InputHTMLAttributes<HTMLButtonElement> {
  label: string | ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost';
  fullWidth?: boolean;
  type?: 'button' | 'reset' | 'submit';
}

const Button: React.FC<IProps> = ({
  onClick,
  label,
  variant = 'primary',
  disabled = false,
  fullWidth = false,
  type = 'button',
  className = '',
  ...props
}): React.ReactElement => {
  const buttonClasses = classNames(`px-4 py-2 rounded-md focus:outline-none ${className}`, {
    'bg-blue-500 text-white': variant === 'primary',
    'bg-gray-500 text-white': variant === 'secondary',
    'bg-green-500 text-white': variant === 'success',
    'bg-red-500 text-white': variant === 'danger',
    'bg-transparent text-gray-600 border border-gray-500 hover:bg-gray-200': variant === 'ghost',
    'cursor-not-allowed opacity-50': disabled,
    'w-full': fullWidth,
  });

  return (
    <button type={type} onClick={onClick} className={buttonClasses} disabled={disabled} {...props}>
      {label}
    </button>
  );
};

export default Button;
