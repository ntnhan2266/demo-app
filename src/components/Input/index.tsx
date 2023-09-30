import React from 'react';
import classNames from 'classnames';

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errorMessage?: string;
  required?: boolean;
}

const Input: React.FC<IProps> = React.forwardRef<HTMLInputElement, IProps>(
  (
    {
      type = 'text',
      placeholder = '',
      value,
      onChange,
      disabled = false,
      required = false,
      label,
      errorMessage,
      ...props
    },
    ref,
  ): React.ReactElement => {
    const inputClasses = classNames('border rounded-md px-3 py-2 focus:outline-none transition duration-300 w-full', {
      'border-gray-400': !disabled,
      'bg-gray-200 cursor-not-allowed': disabled,
      'border-red-500': errorMessage,
    });

    const labelClasses = classNames('block text-sm font-semibold mb-1', {
      'text-red-600': errorMessage,
    });

    return (
      <div className='mb-4'>
        <label htmlFor={label} className={labelClasses}>
          {label}
          {required && <sup className='text-red-600'>*</sup>}
        </label>
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={inputClasses}
          disabled={disabled}
          {...props}
        />
        {errorMessage && <p className='text-red-600 text-xs mt-1'>{errorMessage}</p>}
      </div>
    );
  },
);

Input.displayName = 'InputComponent';

export default Input;
