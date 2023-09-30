import React from 'react';
import classNames from 'classnames';

interface IProps extends React.InputHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  fullWidth?: boolean;
}

const Button: React.FC<IProps> = ({
  onClick,
  label,
  variant = 'primary',
  disabled = false,
  fullWidth = false,
}): React.ReactElement => {
  const buttonClasses = classNames('px-4 py-2 rounded-md focus:outline-none', {
    'bg-blue-500 text-white': variant === 'primary',
    'bg-gray-500 text-white': variant === 'secondary',
    'bg-green-500 text-white': variant === 'success',
    'bg-red-500 text-white': variant === 'danger',
    'cursor-not-allowed opacity-50': disabled,
    'w-full': fullWidth,
  });

  return (
    <button onClick={onClick} className={buttonClasses} disabled={disabled}>
      {label}
    </button>
  );
};

export default Button;
