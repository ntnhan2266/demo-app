import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from '@/pages/LoginPage';
import { ROUTE_PATH } from '@/constants/route-path';
import { IUserContext, UserContext } from '@/contexts/UserContext';
import renderer from 'react-test-renderer';

// Mock the withAuthentication HOC
jest.mock('@/hocs/withAuthentication', () => (Component: React.FC) => Component);

describe('LoginPage', () => {
  const contextValue: IUserContext = {
    user: null,
    setUser: () => {},
  };

  test('should match the snapshot', () => {
    const tree = renderer
      .create(
        <UserContext.Provider value={contextValue}>
          <MemoryRouter>
            <LoginPage />
          </MemoryRouter>
        </UserContext.Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders login form', () => {
    render(
      <UserContext.Provider value={contextValue}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </UserContext.Provider>,
    );

    // Ensure that the login form is rendered
    const loginFormElement = screen.getByTestId('login-form');
    expect(loginFormElement).toBeInTheDocument();
  });

  test('renders link to register page', () => {
    render(
      <UserContext.Provider value={contextValue}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </UserContext.Provider>,
    );

    // Ensure that the link to register page is rendered
    const registerLinkElement = screen.getByText(/Register now/i);
    expect(registerLinkElement).toBeInTheDocument();
    expect(registerLinkElement).toHaveAttribute('href', ROUTE_PATH.REGISTER);
  });
});
