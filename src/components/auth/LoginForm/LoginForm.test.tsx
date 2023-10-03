import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from '@/components/auth/LoginForm';
import { loginUser } from '@/services/auth';
import { useUser } from '@/hooks/useUser';
import { BrowserRouter } from 'react-router-dom';
import { IUserContext, UserContext } from '@/contexts/UserContext';
import renderer from 'react-test-renderer';

jest.mock('@/services/auth', () => ({
  loginUser: jest.fn(),
}));
jest.mock('@/hooks/useUser', () => ({
  useUser: jest.fn(() => ({ user: null, setUser: jest.fn() })),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

const userData = {
  firstName: 'John',
  lastName: 'Doe',
  emailOrPhone: 'john.doe@example.com',
  password: '$2a$10$Bb86lbi8ioa/UgwOVBjqTu0SzGEMu8lruBeoQZ4LZiBKUyNg1QTcG',
};

const contextValue: IUserContext = {
  user: userData,
  setUser: jest.fn(), // Mock setUser function
};

describe('LoginForm', () => {
  beforeEach(() => {
    (useUser as jest.Mock).mockReturnValueOnce(contextValue);

    render(
      <UserContext.Provider value={contextValue}>
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      </UserContext.Provider>,
    );
  });

  test('should match the snapshot', () => {
    const tree = renderer
      .create(
        <UserContext.Provider value={contextValue}>
          <BrowserRouter>
            <LoginForm />
          </BrowserRouter>
        </UserContext.Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should render the form with the correct inputs', () => {
    const emailOrPhoneInput = screen.getByTestId('email-or-phone-input');
    const passwordInput = screen.getByTestId('password-input');
    const submitButton = screen.getByTestId('submit-button');

    expect(emailOrPhoneInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test('should validate form fields', async () => {
    const submitButton = screen.getByTestId('submit-button');

    // Attempt to submit the form without valid inputs
    fireEvent.click(submitButton);

    // Ensure that the form validation error messages are displayed
    expect(await screen.findByText('Email or phone is required.')).toBeInTheDocument();
    expect(await screen.findByText('Password is required.')).toBeInTheDocument();

    // Ensure that the login function is not called when form validation fails
    expect(loginUser).not.toBeCalled();
  });

  test('should call login function', async () => {
    (loginUser as jest.Mock).mockReturnValue({
      firstName: 'John',
      lastName: 'Doe',
      emailOrPhone: 'test@example.com',
      password: 'StrongPassword123!@',
      confirmPassword: 'StrongPassword123!@',
    });
    const emailOrPhoneInput = screen.getByTestId('email-or-phone-input');
    const passwordInput = screen.getByTestId('password-input');
    const submitButton = screen.getByTestId('submit-button');

    fireEvent.input(emailOrPhoneInput, { target: { value: 'test@example.com' } });
    fireEvent.input(passwordInput, { target: { value: 'qwerQWER1234!@' } });
    fireEvent.click(submitButton);

    // Ensure that the login function is called when the form is submitted
    await waitFor(() => {
      expect(loginUser).toHaveBeenCalledWith('test@example.com', 'qwerQWER1234!@');
    });
  });
});
