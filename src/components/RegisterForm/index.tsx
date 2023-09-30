// pages/RegisterPage.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';
import Input from '@/components/Input';
import Button from '@/components/Button';

interface FormInputs {
  firstName: string;
  lastName: string;
  emailOrPhone: string;
  password: string;
  confirmPassword: string;
}

const RegisterForm: React.FC = (): React.ReactElement => {
  const [formData, setFormData] = useState<FormInputs>({
    firstName: '',
    lastName: '',
    emailOrPhone: '',
    password: '',
    confirmPassword: '',
  });

  const [outcomeMessage, setOutcomeMessage] = useState<string | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();

    // Perform validation here before saving to localStorage

    // For simplicity, just display a success message
    setOutcomeMessage('Registration successful!');

    // Reset the form
    setFormData({
      firstName: '',
      lastName: '',
      emailOrPhone: '',
      password: '',
      confirmPassword: '',
    });
  };

  return (
    <div className='max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md'>
      <h2 className='text-2xl font-bold mb-4'>Create your account</h2>
      <form onSubmit={handleSubmit}>
        <Input
          type='text'
          value={formData.firstName}
          onChange={(e) => handleChange(e)}
          label='First Name'
          placeholder='Enter your first name'
        />
        <Input
          type='text'
          value={formData.lastName}
          onChange={(e) => handleChange(e)}
          label='Last Name'
          placeholder='Enter your last name'
        />
        <Input
          type='text'
          value={formData.emailOrPhone}
          onChange={(e) => handleChange(e)}
          label='Email or Phone Number'
          placeholder='Enter either your email or phone number'
        />
        <Input
          type='password'
          value={formData.password}
          onChange={(e) => handleChange(e)}
          label='Password'
          placeholder='Enter your password'
        />
        <Input
          type='password'
          value={formData.confirmPassword}
          onChange={(e) => handleChange(e)}
          label='Confirm Password'
          placeholder='Confirm your password'
        />
        <Button label='Register' type='submit' fullWidth />
      </form>
      {outcomeMessage && <div className='mt-4 p-3 bg-green-200 text-green-800 rounded-md'>{outcomeMessage}</div>}
    </div>
  );
};

export default RegisterForm;
