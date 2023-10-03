import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DashboardPage from '@/pages/DashboardPage';
import { IUserContext, UserContext } from '@/contexts/UserContext';
import renderer from 'react-test-renderer';

// Mock the withAuthentication HOC
jest.mock('@/hocs/withAuthentication', () => (Component: React.FC) => Component);

describe('DashboardPage', () => {
  const contextValue: IUserContext = {
    user: {
      firstName: 'John',
      lastName: 'Doe',
      emailOrPhone: 'john.doe@example.com',
    },
    setUser: () => {},
  };

  test('should match the snapshot', () => {
    const tree = renderer
      .create(
        <UserContext.Provider value={contextValue}>
          <MemoryRouter initialEntries={['/github-repos']} initialIndex={0}>
            <DashboardPage />
          </MemoryRouter>
        </UserContext.Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders dashboard page with sidebar', () => {
    render(
      <UserContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={['/github-repos']} initialIndex={0}>
          <DashboardPage />
        </MemoryRouter>
      </UserContext.Provider>,
    );

    // Ensure that the dashboard page is rendered
    const dashboardPageElement = screen.getByTestId('dashboard-page');
    expect(dashboardPageElement).toBeInTheDocument();

    // Ensure that the sidebar is rendered
    const sidebarElement = screen.getByTestId('sidebar');
    expect(sidebarElement).toBeInTheDocument();
  });

  test('renders UpdateUserInfoForm for /update-info route', () => {
    render(
      <UserContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={['/update-info']} initialIndex={0}>
          <DashboardPage />
        </MemoryRouter>
      </UserContext.Provider>,
    );

    // Ensure that UpdateUserInfoForm is rendered for /update-info route
    const updateInfoFormElement = screen.getByTestId('update-user-info-form');
    expect(updateInfoFormElement).toBeInTheDocument();
  });

  test('renders UpdateUserPasswordForm for /update-password route', () => {
    render(
      <UserContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={['/update-password']} initialIndex={0}>
          <DashboardPage />
        </MemoryRouter>
      </UserContext.Provider>,
    );

    // Ensure that UpdateUserPasswordForm is rendered for /update-password route
    const updatePasswordFormElement = screen.getByTestId('update-user-password-form');
    expect(updatePasswordFormElement).toBeInTheDocument();
  });

  test('renders GitHubRepos for /github-repos route', () => {
    render(
      <UserContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={['/github-repos']} initialIndex={0}>
          <DashboardPage />
        </MemoryRouter>
      </UserContext.Provider>,
    );

    // Ensure that GitHubRepos is rendered for /github-repos route
    const githubReposElement = screen.getByTestId('github-repos');
    expect(githubReposElement).toBeInTheDocument();
  });
});
