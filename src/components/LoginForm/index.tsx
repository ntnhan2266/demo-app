import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '@/services/auth';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { ROUTE_PATH } from '@/constants/route-path';
import { isValidContact } from '@/utils/validation';

interface ILoginFormInputs {
  emailOrPhone: string;
  password: string;
}

const LoginForm: React.FC = (): React.ReactElement => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormInputs>();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = (values: ILoginFormInputs): void => {
    const user = loginUser(values.emailOrPhone, values.password);

    if (!user) {
      setErrorMessage('Login failed. Invalid credentials.');
      return;
    }

    // For simplicity, just display a success message
    setSuccessMessage('Login successful!');

    // Reset the form
    // Note: Use reset() if you need to clear the form fields
    // reset();

    // Navigate to the dashboard or any other page after login
    navigate(ROUTE_PATH.DASHBOARD);
  };

  return (
    <div className='max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md'>
      <h2 className='text-2xl font-bold mb-4'>Login to your account</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register('emailOrPhone', {
            required: 'Email or phone is required.',
            validate: (val: string) => isValidContact(val) || 'Invalid email or phone.',
          })}
          errorMessage={errors.emailOrPhone?.message}
          type='text'
          label='Email or phone'
          placeholder='Enter your email or phone number'
          required
        />
        <Input
          {...register('password', {
            required: 'Password is required.',
          })}
          errorMessage={errors.password?.message}
          type='password'
          label='Password'
          placeholder='Enter your password'
          required
        />
        <Button label='Login' type='submit' fullWidth />
      </form>
      {successMessage && <div className='mt-4 p-3 bg-green-200 text-green-800 rounded-md'>{successMessage}</div>}
      {errorMessage && <div className='mt-4 p-3 bg-red-200 text-red-800 rounded-md'>{errorMessage}</div>}
    </div>
  );
};

export default LoginForm;
