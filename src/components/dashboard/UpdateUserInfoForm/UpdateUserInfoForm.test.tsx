import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UpdateUserInfoForm from '@/components/dashboard/UpdateUserInfoForm';
import { updateUserInfo } from '@/services/auth';
import renderer from 'react-test-renderer';
import { IUserContext, UserContext } from '@/contexts/UserContext';
import { useUser } from '@/hooks/useUser';

jest.mock('@/hooks/useUser');
jest.mock('@/services/auth');

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

describe('UpdateUserInfoForm component', () => {
  const mockUseUser = useUser as jest.Mock;
  const mockUpdateUserInfo = updateUserInfo as jest.Mock;
  const mockSetUser = jest.fn();

  beforeEach(() => {
    mockUseUser.mockReturnValue({ user: { emailOrPhone: 'test@example.com' }, setUser: jest.fn() });
    render(
      <UserContext.Provider value={contextValue}>
        <UpdateUserInfoForm />
      </UserContext.Provider>,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should match the snapshot', () => {
    const tree = renderer.create(<UpdateUserInfoForm />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders the form with the correct inputs', () => {
    const firstNameInput = screen.getByTestId('first-name-input');
    const lastNameInput = screen.getByTestId('last-name-input');
    const updateButton = screen.getByTestId('submit-button');

    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(updateButton).toBeInTheDocument();
  });

  test('calls updateUserInfo function when form is submitted with valid data', async () => {
    mockUseUser.mockReturnValue({ user: { emailOrPhone: 'test@example.com' }, setUser: mockSetUser });
    mockUpdateUserInfo.mockReturnValue({ emailOrPhone: 'test@example.com', firstName: 'John', lastName: 'Doe' });

    // Fill in the form
    const firstNameInput = screen.getByTestId('first-name-input');
    const lastNameInput = screen.getByTestId('last-name-input');
    const updateButton = screen.getByTestId('submit-button');

    fireEvent.input(firstNameInput, { target: { value: 'John' } });
    fireEvent.input(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.click(updateButton);

    // Wait for the success modal to appear
    await waitFor(() => {
      expect(mockUpdateUserInfo).toHaveBeenCalledWith('test@example.com', { firstName: 'John', lastName: 'Doe' });
      expect(screen.getByText('Your account has been successfully updated.')).toBeInTheDocument();
    });
  });
});
