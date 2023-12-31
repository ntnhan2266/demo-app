import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from '@/components/dashboard/Sidebar';
import UpdateUserInfoForm from '@/components/dashboard/UpdateUserInfoForm';
import GitHubRepos from '@/components/dashboard/GitHubRepos';
import UpdateUserPasswordForm from '@/components/dashboard/UpdatePasswordForm';
import withAuthentication from '@/hocs/withAuthentication';

const DashboardPage: React.FC = () => {
  return (
    <div data-testid='dashboard-page' className='flex flex-col lg:flex-row h-screen bg-gray-100'>
      <Sidebar />

      <div className='flex-1 flex flex-col overflow-hidden'>
        <main className='flex-1 overflow-x-hidden overflow-y-auto p-4 lg:p-8'>
          <Routes>
            <Route path='/update-info' element={<UpdateUserInfoForm />} />
            <Route path='/update-password' element={<UpdateUserPasswordForm />} />
            <Route path='/github-repos' element={<GitHubRepos />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default withAuthentication(DashboardPage);
