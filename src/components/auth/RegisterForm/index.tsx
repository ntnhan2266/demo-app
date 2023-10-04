import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { isValidContact } from '@/utils/validation';
import { registerUser } from '@/services/auth';
import ErrorModal from '@/components/common/ErrorModal';
import SuccessModal from '@/components/common/SuccessModal';

interface IFormInputs {
  firstName: string;
  lastName: string;
  emailOrPhone: string;
  password: string;
  confirmPassword: string;
}

const RegisterForm: React.FC = (): React.ReactElement => {
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
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const closeErrorModal = (): void => {
    // Close the error modal
    setIsErrorModalOpen(false);
  };

  const closeSuccessModal = (): void => {
    // Close the success modal
    setIsSuccessModalOpen(false);
  };

  const onSubmit = (values: IFormInputs): void => {
    const result = registerUser(values);
    if (!result) {
      // Registration failed
      setIsErrorModalOpen(true);
      setError('emailOrPhone', {
        message: 'This email or phone is already in use.',
      });
      return;
    }

    // Registration successful
    setIsSuccessModalOpen(true);

    // Reset the form
    reset();
  };

  return (
    <div data-testid='register-form' className='max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow'>
      <h2 className='text-2xl font-bold mb-4 uppercase'>Create your account</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register('firstName', { required: 'First name is required.' })}
          errorMessage={errors.firstName?.message}
          type='text'
          label='First name'
          placeholder='Enter your first name'
          wrapperClass='mb-4'
          data-testid='first-name-input'
          inputClasses='w-full md:w-full'
          required
        />
        <Input
          {...register('lastName', { required: 'Last name is required.' })}
          errorMessage={errors.lastName?.message}
          type='text'
          label='Last name'
          placeholder='Enter your last name'
          wrapperClass='mb-4'
          data-testid='last-name-input'
          inputClasses='w-full md:w-full'
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
          wrapperClass='mb-4'
          data-testid='email-or-phone-input'
          inputClasses='w-full md:w-full'
          required
        />
        <Input
          {...register('password', {
            required: 'Password is required.',
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{12,}$/,
              message:
                'Password must be strong (include uppercase, lowercase, number, special character, and at least 12 characters).',
            },
          })}
          errorMessage={errors.password?.message}
          type='password'
          label='Password'
          placeholder='Enter your password'
          wrapperClass='mb-4'
          data-testid='password-input'
          inputClasses='w-full md:w-full'
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
          wrapperClass='mb-4'
          data-testid='confirm-password-input'
          inputClasses='w-full md:w-full'
          required
        />
        <Button data-testid='submit-button' label='Register' type='submit' fullWidth />
      </form>
      <ErrorModal
        title='Failure!'
        content='There was an error during the registration process. Please try again.'
        isOpen={isErrorModalOpen}
        onClose={closeErrorModal}
      />
      <SuccessModal
        title='Success!'
        content='Your account has been successfully registered.'
        isOpen={isSuccessModalOpen}
        onClose={closeSuccessModal}
      />
    </div>
  );
};

export default RegisterForm;
