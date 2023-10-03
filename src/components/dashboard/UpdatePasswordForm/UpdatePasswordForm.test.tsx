import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UpdatePasswordForm from '@/components/dashboard/UpdatePasswordForm';
import { useUser } from '@/hooks/useUser';
import { updateUserPassword } from '@/services/auth';
import renderer from 'react-test-renderer';

jest.mock('@/hooks/useUser');
jest.mock('@/services/auth');

describe('UpdatePasswordForm component', () => {
  const mockUseUser = useUser as jest.Mock;
  const mockUpdateUserPassword = updateUserPassword as jest.Mock;

  beforeEach(() => {
    mockUseUser.mockReturnValue({ user: { emailOrPhone: 'test@example.com' } });
    render(<UpdatePasswordForm />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should match the snapshot', () => {
    const tree = renderer.create(<UpdatePasswordForm />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders the form with the correct inputs', () => {
    const currentPasswordInput = screen.getByTestId('current-password-input');
    const newPasswordInput = screen.getByTestId('new-password-input');
    const confirmNewPasswordInput = screen.getByTestId('confirm-password-input');
    const updateButton = screen.getByTestId('submit-button');

    expect(currentPasswordInput).toBeInTheDocument();
    expect(newPasswordInput).toBeInTheDocument();
    expect(confirmNewPasswordInput).toBeInTheDocument();
    expect(updateButton).toBeInTheDocument();
  });

  test('displays error messages when form is submitted with invalid data', async () => {
    const updateButton = screen.getByTestId('submit-button');
    fireEvent.click(updateButton);

    // Ensure that error messages are displayed for required fields
    expect(await screen.findByText('Current password is required.')).toBeInTheDocument();
    expect(await screen.findByText('New password is required')).toBeInTheDocument();
    expect(await screen.findByText('Confirm new password is required.')).toBeInTheDocument();
  });

  test('displays error message when current password is incorrect', async () => {
    mockUpdateUserPassword.mockReturnValue(false);

    const currentPasswordInput = screen.getByTestId('current-password-input');
    const newPasswordInput = screen.getByTestId('new-password-input');
    const confirmNewPasswordInput = screen.getByTestId('confirm-password-input');
    fireEvent.change(currentPasswordInput, {
      target: {
        value: 'qwerQWER1234!@',
      },
    });
    fireEvent.change(newPasswordInput, {
      target: {
        value: 'qwerQWER1234!@@',
      },
    });
    fireEvent.change(confirmNewPasswordInput, {
      target: {
        value: 'qwerQWER1234!@@',
      },
    });

    const updateButton = screen.getByTestId('submit-button');
    fireEvent.click(updateButton);

    // Ensure that an error message for incorrect current password is displayed
    expect(await screen.findByText('Incorrect current password.')).toBeInTheDocument();
  });

  test('calls updateUserPassword function when form is submitted with valid data', async () => {
    mockUpdateUserPassword.mockReturnValue(true);

    // Fill in the form
    const currentPasswordInput = screen.getByTestId('current-password-input');
    const newPasswordInput = screen.getByTestId('new-password-input');
    const confirmNewPasswordInput = screen.getByTestId('confirm-password-input');
    const updateButton = screen.getByTestId('submit-button');

    fireEvent.change(currentPasswordInput, {
      target: {
        value: 'qwerQWER1234!@',
      },
    });
    fireEvent.change(newPasswordInput, {
      target: {
        value: 'qwerQWER1234!@@',
      },
    });
    fireEvent.change(confirmNewPasswordInput, {
      target: {
        value: 'qwerQWER1234!@@',
      },
    });

    fireEvent.click(updateButton);

    // Wait for the success modal to appear
    await waitFor(() => {
      expect(mockUpdateUserPassword).toHaveBeenCalledWith('test@example.com', 'qwerQWER1234!@', 'qwerQWER1234!@@');
      expect(screen.getByText('Your password has been successfully updated.')).toBeInTheDocument();
    });
  });
});
