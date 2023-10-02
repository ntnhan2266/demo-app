import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { updateUserInfo } from '@/services/auth';
import ErrorModal from '@/components/common/ErrorModal';
import SuccessModal from '@/components/common/SuccessModal';

interface IFormInputs {
  firstName: string;
  lastName: string;
  emailOrPhone: string;
  password: string;
  confirmPassword: string;
}

const UpdateInfoForm: React.FC = (): React.ReactElement => {
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
    setIsErrorModalOpen(false);
  };

  const closeSuccessModal = (): void => {
    setIsSuccessModalOpen(false);
  };

  const onSubmit = (values: IFormInputs): void => {
    const result = updateUserInfo(values.emailOrPhone, values);
    if (!result) {
      setIsErrorModalOpen(true);
      setError('emailOrPhone', {
        message: 'Failed to update user information.',
      });
      return;
    }

    setIsSuccessModalOpen(true);
    reset(); // Reset the form on successful update
  };

  return (
    <div className='max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md'>
      <h2 className='text-2xl font-bold mb-4'>Update your information</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register('firstName')}
          errorMessage={errors.firstName?.message}
          type='text'
          label='First name'
          placeholder='Enter your first name'
          required
        />
        <Input
          {...register('lastName')}
          errorMessage={errors.lastName?.message}
          type='text'
          label='Last name'
          placeholder='Enter your last name'
          required
        />
        <Input
          {...register('password', {
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
        <Button label='Update Info' type='submit' fullWidth />
      </form>
      <ErrorModal
        title='Failure!'
        content='There was an error during the update process. Please try again.'
        isOpen={isErrorModalOpen}
        onClose={closeErrorModal}
      />
      <SuccessModal
        title='Success!'
        content='Your account has been successfully updated.'
        isOpen={isSuccessModalOpen}
        onClose={closeSuccessModal}
      />
    </div>
  );
};

export default UpdateInfoForm;
