import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import cs from 'classnames';
import { useUser } from '@/hooks/useUser';
import { ROUTE_PATH } from '@/constants/route-path';
import Button from '@/components/common/Button';
import AppLogo from '@/components/common/AppLogo';
import { removeAuthUserFromLocalStorage } from '@/utils/auth-storage';
import icBurgerMenu from '@/assets/icons/ic-burger-menu.svg';
import icClose from '@/assets/icons/ic-close.svg';

const Sidebar: React.FC = (): React.ReactElement => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (): void => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const onLogout = (): void => {
    removeAuthUserFromLocalStorage();
    closeDrawer();
    navigate(ROUTE_PATH.LOGIN);
  };

  if (!user) {
    return <></>; // If there is no user or on small screens when the drawer is closed, return null
  }

  return (
    <>
      <div className='flex justify-between items-center lg:hidden border-b border-gray-300 py-2 px-4 shadow'>
        <AppLogo size='3xl' />

        <button className='cursor-pointer p-2 font-bol' onClick={toggleDrawer}>
          <img className='w-6' src={icBurgerMenu} alt='ic-burger-menu' />
        </button>
      </div>
      <div
        data-testid='sidebar'
        className={cs(
          'lg:w-64 left-0 right-0 top-0 bottom-0 lg:block shadow-md transition-transform duration-300 ease-in-out p-4 bg-white z-10 lg:z-0 fixed lg:static lg:translate-x-0',
          {
            'translate-x-0': isDrawerOpen,
            'translate-x-full': !isDrawerOpen,
          },
        )}
      >
        <div className='mb-6 lg:block flex items-center justify-between'>
          <AppLogo size='3xl' />
          <button className='cursor-pointer p-2 font-bol lg:hidden' onClick={closeDrawer}>
            <img className='w-5' src={icClose} alt='ic-close' />
          </button>
        </div>
        <h2 className='text-xl font-semibold mb-2 text-blue-800'>
          {user.firstName} {user.lastName}
        </h2>
        <p className='mb-4 text-gray-600'>{user.emailOrPhone}</p>
        <nav className=''>
          <ul>
            <li className='mb-2'>
              <NavLink
                onClick={closeDrawer}
                to={ROUTE_PATH.DASHBOARD_GITHUB_REPOS}
                className={({ isActive }) =>
                  (isActive ? 'text-indigo-600' : '') +
                  ' block w-full text-left p-2 rounded-md transition duration-300 hover:bg-indigo-100'
                }
              >
                Github repos
              </NavLink>
            </li>
            <li className='mb-2'>
              <NavLink
                onClick={closeDrawer}
                to={ROUTE_PATH.DASHBOARD_UPDATE_INFO}
                className={({ isActive }) =>
                  (isActive ? 'text-indigo-600' : '') +
                  ' block w-full text-left p-2 rounded-md transition duration-300 hover:bg-indigo-100'
                }
              >
                Update user info
              </NavLink>
            </li>
            <li className='mb-2'>
              <NavLink
                onClick={closeDrawer}
                to={ROUTE_PATH.DASHBOARD_UPDATE_PASSWORD}
                className={({ isActive }) =>
                  (isActive ? 'text-indigo-600 bg-indigo-100' : '') +
                  ' block w-full text-left p-2 rounded-md transition duration-300 hover:bg-indigo-100'
                }
              >
                Update password
              </NavLink>
            </li>
          </ul>
          <Button className='absolute left-4 right-4 bottom-6' onClick={onLogout} variant='secondary' label='Logout' />
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
