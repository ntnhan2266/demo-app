import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '@/components/auth/RegisterForm';
import AppLogo from '@/components/common/AppLogo';
import { ROUTE_PATH } from '@/constants/route-path';
import withAuthentication from '@/hocs/withAuthentication';

const RegisterPage: React.FC = () => {
  return (
    <div data-testid='register-page' className='container mx-auto'>
      <div className='mb-4 max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow'>
        <div className='mb-6'>
          <AppLogo />
        </div>
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
  );
};

export default withAuthentication(RegisterPage);
