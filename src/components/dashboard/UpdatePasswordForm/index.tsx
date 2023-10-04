import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import ErrorModal from '@/components/common/ErrorModal';
import SuccessModal from '@/components/common/SuccessModal';
import { updateUserPassword } from '@/services/auth';
import { useUser } from '@/hooks/useUser';

interface IFormInputs {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

const UpdateUserPasswordForm: React.FC = (): React.ReactElement => {
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<IFormInputs>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const closeErrorModal = (): void => {
    setIsErrorModalOpen(false);
  };

  const closeSuccessModal = (): void => {
    setIsSuccessModalOpen(false);
  };

  const onSubmit = (values: IFormInputs): void => {
    setErrorMessage(null);

    if (!user) {
      setErrorMessage('User not found');
      setIsErrorModalOpen(true);
      return;
    }

    const result = updateUserPassword(user.emailOrPhone, values.currentPassword, values.newPassword);

    if (!result) {
      // Password update failed
      setIsErrorModalOpen(true);
      setErrorMessage('Incorrect current password.');
      return;
    }

    // Password update successful
    setIsSuccessModalOpen(true);

    // Reset the form
    reset();
  };

  return (
    <div data-testid='update-user-password-form'>
      <h2 className='text-2xl font-bold mb-8 uppercase'>Update your password</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register('currentPassword', { required: 'Current password is required.' })}
          errorMessage={errors.currentPassword?.message}
          type='password'
          label='Current Password'
          placeholder='Enter your current password'
          wrapperClass='mb-4'
          data-testid='current-password-input'
          required
        />
        <Input
          {...register('newPassword', {
            required: 'New password is required',
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{12,}$/,
              message:
                'Password must be strong (include uppercase, lowercase, number, special character, and at least 12 characters).',
            },
          })}
          errorMessage={errors.newPassword?.message}
          type='password'
          label='New Password'
          placeholder='Enter your new password'
          wrapperClass='mb-4'
          data-testid='new-password-input'
          required
        />
        <Input
          {...register('confirmNewPassword', {
            required: 'Confirm new password is required.',
            validate: (val: string) => {
              if (watch('newPassword') !== val) {
                return 'Your new passwords do not match.';
              }
            },
          })}
          errorMessage={errors.confirmNewPassword?.message}
          type='password'
          label='Confirm New Password'
          placeholder='Confirm your new password'
          wrapperClass='mb-4'
          data-testid='confirm-password-input'
          required
        />
        <Button data-testid='submit-button' label='Update Password' type='submit' className='w-full lg:w-96' />
      </form>
      <ErrorModal
        title='Failure!'
        content={errorMessage || 'There was an error during the password update process. Please try again.'}
        isOpen={isErrorModalOpen}
        onClose={closeErrorModal}
      />
      <SuccessModal
        title='Success!'
        content='Your password has been successfully updated.'
        isOpen={isSuccessModalOpen}
        onClose={closeSuccessModal}
      />
    </div>
  );
};

export default UpdateUserPasswordForm;
