import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegisterForm from '@/components/auth/RegisterForm';
import { registerUser } from '@/services/auth';
import renderer from 'react-test-renderer';

// Mock the services and functions
jest.mock('@/services/auth', () => ({
  registerUser: jest.fn(),
}));

describe('RegisterForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(<RegisterForm />);
  });

  test('should match the snapshot', () => {
    const tree = renderer.create(<RegisterForm />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should render the form with the correct inputs', () => {
    const firstNameInput = screen.getByTestId('first-name-input');
    const lastNameInput = screen.getByTestId('last-name-input');
    const emailOrPhoneInput = screen.getByTestId('email-or-phone-input');
    const passwordInput = screen.getByTestId('password-input');
    const confirmPasswordInput = screen.getByTestId('confirm-password-input');
    const submitButton = screen.getByTestId('submit-button');

    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(emailOrPhoneInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test('should display error messages when form is submitted with invalid data', async () => {
    const submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton);

    // Ensure that error messages are displayed for required fields
    expect(await screen.findByText('First name is required.')).toBeInTheDocument();
    expect(await screen.findByText('Last name is required.')).toBeInTheDocument();
    expect(await screen.findByText('Email or phone is required.')).toBeInTheDocument();
    expect(await screen.findByText('Password is required.')).toBeInTheDocument();
    expect(await screen.findByText('Confirm password is required.')).toBeInTheDocument();
  });

  test('should display error message when email or phone is invalid', async () => {
    const emailOrPhoneInput = screen.getByTestId('email-or-phone-input');
    fireEvent.input(emailOrPhoneInput, { target: { value: 'invalid-email' } });

    const submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton);

    // Ensure that an error message for invalid email/phone is displayed
    expect(await screen.findByText('Invalid email or phone.')).toBeInTheDocument();
  });

  test('should display error message when passwords do not match', async () => {
    const passwordInput = screen.getByTestId('password-input');
    const confirmPasswordInput = screen.getByTestId('confirm-password-input');

    fireEvent.input(passwordInput, { target: { value: 'qwerQWER1234!@' } });
    fireEvent.input(confirmPasswordInput, { target: { value: 'qwerQWER1234!@@' } });

    const submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton);

    // Ensure that an error message for passwords not matching is displayed
    expect(await screen.findByText('Your passwords do not match.')).toBeInTheDocument();
  });

  test('should call registerUser function when form is submitted with valid data', async () => {
    (registerUser as jest.Mock).mockReturnValue(true);

    const firstNameInput = screen.getByTestId('first-name-input');
    const lastNameInput = screen.getByTestId('last-name-input');
    const emailOrPhoneInput = screen.getByTestId('email-or-phone-input');
    const passwordInput = screen.getByTestId('password-input');
    const confirmPasswordInput = screen.getByTestId('confirm-password-input');
    const submitButton = screen.getByTestId('submit-button');

    fireEvent.input(firstNameInput, { target: { value: 'John' } });
    fireEvent.input(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.input(emailOrPhoneInput, { target: { value: 'test@example.com' } });
    fireEvent.input(passwordInput, { target: { value: 'StrongPassword123!@' } });
    fireEvent.input(confirmPasswordInput, { target: { value: 'StrongPassword123!@' } });

    fireEvent.click(submitButton);

    // Wait for the success modal to appear
    await waitFor(() => {
      expect(registerUser).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        emailOrPhone: 'test@example.com',
        password: 'StrongPassword123!@',
        confirmPassword: 'StrongPassword123!@',
      });
      expect(screen.getByText('Your account has been successfully registered.')).toBeInTheDocument();
    });
  });

  test('should display error modal when registration fails', async () => {
    (registerUser as jest.Mock).mockReturnValue(false);

    const firstNameInput = screen.getByTestId('first-name-input');
    const lastNameInput = screen.getByTestId('last-name-input');
    const emailOrPhoneInput = screen.getByTestId('email-or-phone-input');
    const passwordInput = screen.getByTestId('password-input');
    const confirmPasswordInput = screen.getByTestId('confirm-password-input');
    const submitButton = screen.getByTestId('submit-button');

    fireEvent.input(firstNameInput, { target: { value: 'John' } });
    fireEvent.input(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.input(emailOrPhoneInput, { target: { value: 'test@example.com' } });
    fireEvent.input(passwordInput, { target: { value: 'StrongPassword123!@' } });
    fireEvent.input(confirmPasswordInput, { target: { value: 'StrongPassword123!@' } });

    fireEvent.click(submitButton);

    // Wait for the error modal to appear
    await waitFor(() => {
      expect(screen.getByText('This email or phone is already in use.')).toBeInTheDocument();
    });
  });
});
