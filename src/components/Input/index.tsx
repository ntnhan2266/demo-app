import React from 'react';
import classNames from 'classnames';

interface InputProps {
  type?: 'text' | 'password' | 'email' | 'number';
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  errorMessage?: string;
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder = '',
  value,
  onChange,
  disabled = false,
  label,
  errorMessage,
}): React.ReactElement => {
  const inputClasses = classNames('border rounded-md px-3 py-2 focus:outline-none transition duration-300 w-full', {
    'border-gray-400': !disabled,
    'bg-gray-200 cursor-not-allowed': disabled,
    'border-red-500': errorMessage,
  });

  const labelClasses = classNames('block text-sm font-semibold mb-1', {
    'text-red-500': errorMessage,
  });

  return (
    <div className='mb-4'>
      <label htmlFor={label} className={labelClasses}>
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={inputClasses}
        disabled={disabled}
      />
      {errorMessage && <p className='text-red-500 text-xs mt-1'>{errorMessage}</p>}
    </div>
  );
};

export default Input;
