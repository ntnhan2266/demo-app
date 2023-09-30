import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import Button from '@/components/Button';
import Input from '@/components/Input';
import { isValidContact } from '@/utils/validation';
import { registerUser } from '@/services/auth';
import { ROUTE_PATH } from '@/constants/route-path';

interface IFormInputs {
  firstName: string;
  lastName: string;
  emailOrPhone: string;
  password: string;
  confirmPassword: string;
}

const RegisterForm: React.FC = (): React.ReactElement => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setError,
    formState: { errors },
  } = useForm<IFormInputs>({
    defaultValues: {
      firstName: '',
      lastName: '',
      emailOrPhone: '',
      password: '',
      confirmPassword: '',
    },
  });
  const [outcomeMessage, setOutcomeMessage] = useState<string | null>(null);

  const onSubmit = (values: IFormInputs): void => {
    const result = registerUser(values);
    if (!result) {
      setError('emailOrPhone', {
        message: 'This email or phone is already in use.'
      });
      return;
    }

    // For simplicity, just display a success message
    setOutcomeMessage('Registration successful!');

    // Reset the form
    reset();

    // Navigate to login page
    navigate(ROUTE_PATH.LOGIN);
  };

  return (
    <div className='max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md'>
      <h2 className='text-2xl font-bold mb-4'>Create your account</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register('firstName', { required: 'First name is required.' })}
          errorMessage={errors.firstName?.message}
          type='text'
          label='First name'
          placeholder='Enter your first name'
          required
        />
        <Input
          {...register('lastName', { required: 'Last name is required.' })}
          errorMessage={errors.lastName?.message}
          type='text'
          label='Last name'
          placeholder='Enter your last name'
          required
        />
        <Input
          {...register('emailOrPhone', {
            required: 'Email or phone is required.',
            validate: (val: string) => isValidContact(val) || 'Invalid email or phone.',
          })}
          errorMessage={errors.emailOrPhone?.message}
          type='text'
          name='emailOrPhone'
          label='Email or phone'
          placeholder='Enter either your email or phone number'
          required
        />
        <Input
          {...register('password', {
            required: 'Password is required',
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/,
              message:
                'Password must be strong (include uppercase, lowercase, number, special character, and at least 12 characters).',
            },
          })}
          errorMessage={errors.password?.message}
          type='password'
          label='Password'
          placeholder='Enter your password'
          required
        />
        <Input
          {...register('confirmPassword', {
            required: 'Confirm password is required.',
            validate: (val: string) => {
              if (watch('password') != val) {
                return 'Your passwords do not match.';
              }
            },
          })}
          errorMessage={errors.confirmPassword?.message}
          type='password'
          label='Confirm password'
          placeholder='Confirm your password'
          required
        />
        <Button label='Register' type='submit' fullWidth />
      </form>
      {outcomeMessage && <div className='mt-4 p-3 bg-green-200 text-green-800 rounded-md'>{outcomeMessage}</div>}
    </div>
  );
};

export default RegisterForm;
