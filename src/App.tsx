import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from '@/pages/RegisterPage';
import LoginPage from '@/pages/LoginPage';
import DashboardPage from '@/pages/DashboardPage';
import { UserProvider } from '@/contexts/user-context';
import { ROUTE_PATH } from '@/constants/route-path';

const App: React.FC = (): React.ReactElement => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path={ROUTE_PATH.REGISTER} element={<RegisterPage />} />
          <Route path={ROUTE_PATH.LOGIN} element={<LoginPage />} />
          <Route path={ROUTE_PATH.DASHBOARD} element={<DashboardPage />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
