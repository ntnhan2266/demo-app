import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import RegisterPage from '@/pages/RegisterPage';
import LoginPage from '@/pages/LoginPage';
import DashboardPage from '@/pages/DashboardPage';
import { UserProvider } from '@/contexts/UserContext';
import { ROUTE_PATH } from '@/constants/route-path';

const App: React.FC = (): React.ReactElement => {
  return (
    <UserProvider>
      <Routes>
        <Route path={ROUTE_PATH.REGISTER} element={<RegisterPage />} />
        <Route path={ROUTE_PATH.LOGIN} element={<LoginPage />} />
        <Route path={ROUTE_PATH.DASHBOARD} element={<DashboardPage />} />
        <Route path='*' element={<Navigate to={ROUTE_PATH.LOGIN} />} />
      </Routes>
    </UserProvider>
  );
};

export default App;
