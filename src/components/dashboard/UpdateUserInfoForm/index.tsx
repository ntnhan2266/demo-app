import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { updateUserInfo } from '@/services/auth';
import ErrorModal from '@/components/common/ErrorModal';
import SuccessModal from '@/components/common/SuccessModal';
import { useUser } from '@/hooks/useUser';

interface IFormInputs {
  firstName: string;
  lastName: string;
}

const UpdateInfoForm: React.FC = (): React.ReactElement => {
  const { user, setUser } = useUser();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInputs>({
    defaultValues: {
      firstName: '',
      lastName: '',
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

    if (!values.lastName && !values.firstName) {
      return;
    }

    const result = updateUserInfo(user.emailOrPhone, values);
    if (!result) {
      setIsErrorModalOpen(true);
      return;
    }

    setUser(result);
    setIsSuccessModalOpen(true);
    reset(); // Reset the form on successful update
  };

  return (
    <div data-testid='update-user-info-form'>
      <h2 className='text-2xl font-bold mb-4'>Update your information</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input disabled type='text' label='Email or phone' wrapperClass='mb-4' value={user?.emailOrPhone} />
        <Input
          {...register('firstName')}
          errorMessage={errors.firstName?.message}
          type='text'
          label='First name'
          placeholder='Enter your first name'
          wrapperClass='mb-4'
          data-testid='first-name-input'
        />
        <Input
          {...register('lastName')}
          errorMessage={errors.lastName?.message}
          type='text'
          label='Last name'
          placeholder='Enter your last name'
          wrapperClass='mb-4'
          data-testid='last-name-input'
        />
        <Button data-testid='submit-button' label='Update Info' type='submit' className='w-96' />
      </form>
      <ErrorModal
        title='Failure!'
        content={errorMessage || 'There was an error during the update process. Please try again.'}
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
