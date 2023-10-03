import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RegisterPage from '@/pages/RegisterPage';
import { ROUTE_PATH } from '@/constants/route-path';
import renderer from 'react-test-renderer';

// Mock the withAuthentication HOC
jest.mock('@/hocs/withAuthentication', () => (Component: React.FC) => Component);

describe('RegisterPage', () => {
  test('should match the snapshot', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <RegisterPage />
        </MemoryRouter>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders RegisterForm', () => {
    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>,
    );

    const registerFormElement = screen.getByTestId('register-form'); // Make sure to set the data-testid in RegisterForm component
    expect(registerFormElement).toBeInTheDocument();
  });

  test('renders link to Login page', () => {
    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>,
    );

    const loginLinkElement = screen.getByRole('link', { name: /login now/i });
    expect(loginLinkElement).toBeInTheDocument();
    expect(loginLinkElement).toHaveAttribute('href', ROUTE_PATH.LOGIN);
  });
});
