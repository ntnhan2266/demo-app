import React from 'react';
import RegisterForm from '@/components/RegisterForm';
import { Link } from 'react-router-dom';
import { ROUTE_PATH } from '@/constants/route-path';

const RegisterPage: React.FC = () => {
  return (
    <div className='flex justify-center'>
      <div className='flex-1'>
        <div className='mb-4'>
          <RegisterForm />
        </div>
        <div>
          <p className='text-center'>
            Already have an account? &nbsp;
            <Link className='underline' to={ROUTE_PATH.LOGIN}>
              Login now.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
