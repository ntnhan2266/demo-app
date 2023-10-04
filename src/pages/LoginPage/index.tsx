import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '@/components/auth/LoginForm';
import { ROUTE_PATH } from '@/constants/route-path';
import withAuthentication from '@/hocs/withAuthentication';

const LoginPage: React.FC = () => {
  return (
    <div data-testid='login-page' className='container mx-auto'>
      <div className='flex-1'>
        <div className='mb-4'>
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
    </div>
  );
};

export default withAuthentication(LoginPage);
