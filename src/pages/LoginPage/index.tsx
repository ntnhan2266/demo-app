import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '@/components/auth/LoginForm';
import AppLogo from '@/components/common/AppLogo';
import { ROUTE_PATH } from '@/constants/route-path';
import withAuthentication from '@/hocs/withAuthentication';

const LoginPage: React.FC = () => {
  return (
    <div data-testid='login-page' className='container mx-auto'>
      <div className='mb-4 max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow'>
        <div className='mb-6'>
          <AppLogo />
        </div>
        <LoginForm />
      </div>
      <div>
        <p className='text-center'>
          Don&apos;t have an account yet? &nbsp;
          <Link className='underline' to={ROUTE_PATH.REGISTER}>
            Register now.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default withAuthentication(LoginPage);
