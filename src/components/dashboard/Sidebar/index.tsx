import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '@/hooks/useUser';
import { ROUTE_PATH } from '@/constants/route-path';
import Button from '@/components/common/Button';
import { removeAuthUserFromLocalStorage } from '@/utils/auth-storage';

const Sidebar: React.FC = (): React.ReactElement => {
  const { user } = useUser();
  const navigate = useNavigate();

  const onLogout = (): void => {
    removeAuthUserFromLocalStorage();
    navigate(ROUTE_PATH.LOGIN);
  };

  if (!user) {
    return <></>; // If there is no user, return an empty fragment
  }

  return (
    <aside className='shadow text-black p-4'>
      <div className='mb-4'>
        <h2 className='text-xl font-semibold'>
          {user.firstName} {user.lastName}
        </h2>
        <p>{user.emailOrPhone}</p>
      </div>

      <nav>
        <ul>
          <li className='mb-2'>
            <Link to={ROUTE_PATH.DASHBOARD_UPDATE_INFO} className='block w-full text-left hover:bg-green p-2'>
              Update user info
            </Link>
          </li>
          <li className='mb-2'>
            <Link to={ROUTE_PATH.DASHBOARD_UPDATE_PASSWORD} className='block w-full text-left hover:bg-green p-2'>
              Update password
            </Link>
          </li>
          <li className='mb-2'>
            <Link to={ROUTE_PATH.DASHBOARD_GITHUB_REPOS} className='block w-full text-left hover:bg-blue-300 p-2'>
              Query github repos
            </Link>
          </li>
          <li className='mb-2'>
            <Button onClick={onLogout} variant='ghost' label='Logout' fullWidth />
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
