// Sidebar.tsx

import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useUser } from '@/hooks/useUser';
import { ROUTE_PATH } from '@/constants/route-path';
import Button from '@/components/common/Button';
import { removeAuthUserFromLocalStorage } from '@/utils/auth-storage';
import useWindowDimensions from '@/hooks/useWindowDimensions';
import { BREAKPOINTS } from '@/constants/breakpoints';

const Sidebar: React.FC = (): React.ReactElement => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { width } = useWindowDimensions();
  const isSmallScreen = width < BREAKPOINTS.medium;
  const [isDrawerOpen, setIsDrawerOpen] = useState(!isSmallScreen);

  const toggleDrawer = (): void => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const onLogout = (): void => {
    removeAuthUserFromLocalStorage();
    navigate(ROUTE_PATH.LOGIN);
  };

  if (!user) {
    return <></>; // If there is no user or on small screens when the drawer is closed, return null
  }

  return (
    <>
      {isSmallScreen && (
        <button className="lg:hidden cursor-pointer p-4" onClick={toggleDrawer}>
          ☰
        </button>
      )}
      <div
        data-testid="sidebar"
        className={`
          lg:w-64 lg:block lg:shadow-md transition-transform duration-300 ease-in-out ${isSmallScreen ? 'fixed top-0 left-0 h-screen bg-white transform' : 'relative'}
          ${isSmallScreen ? (isDrawerOpen ? 'translate-x-0' : '-translate-x-full') : ''}`}>
        <div className={`p-4`}>
          <h2 className="text-xl font-semibold mb-2 text-blue-800">
            {user.firstName} {user.lastName}
          </h2>
          <p className="mb-4 text-gray-600">{user.emailOrPhone}</p>

          <nav>
            <ul>
              <li className='mb-2'>
                <NavLink
                  to={ROUTE_PATH.DASHBOARD_UPDATE_INFO}
                  className={({ isActive }) => (isActive ? "text-indigo-600" : "") + ' block w-full text-left p-2 rounded-md transition duration-300 hover:bg-indigo-100'}
                >
                  Update user info
                </NavLink>
              </li>
              <li className='mb-2'>
                <NavLink
                  to={ROUTE_PATH.DASHBOARD_UPDATE_PASSWORD}
                  className={({ isActive }) => (isActive ? "text-indigo-600 bg-indigo-100" : "") + ' block w-full text-left p-2 rounded-md transition duration-300 hover:bg-indigo-100'}
                >
                  Update password
                </NavLink>
              </li>
              <li className='mb-2'>
                <NavLink
                  to={ROUTE_PATH.DASHBOARD_GITHUB_REPOS}
                  className={({ isActive }) => (isActive ? "text-indigo-600" : "") + ' block w-full text-left p-2 rounded-md transition duration-300 hover:bg-indigo-100'}
                >
                  Github repos
                </NavLink>
              </li>
              <li className='mb-2'>
                <Button onClick={onLogout} variant='secondary' label='Logout' fullWidth />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
