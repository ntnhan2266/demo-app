import React from 'react';
import classNames from 'classnames';

interface ButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  label: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  disabled?: boolean;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  label,
  type = 'button',
  variant = 'primary',
  disabled = false,
  fullWidth = false,
}): React.ReactElement => {
  const buttonClasses = classNames(
    'px-4 py-2 rounded-md focus:outline-none',
    {
      'bg-blue-500 text-white': variant === 'primary',
      'bg-gray-500 text-white': variant === 'secondary',
      'bg-green-500 text-white': variant === 'success',
      'bg-red-500 text-white': variant === 'danger',
      'cursor-not-allowed opacity-50': disabled,
      'w-full': fullWidth
    }
  );

  return (
    <button
      onClick={onClick}
      type={type}
      className={buttonClasses}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
