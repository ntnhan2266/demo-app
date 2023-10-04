import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from '@/components/dashboard/Sidebar';
import { UserContext } from '@/contexts/UserContext';
import { removeAuthUserFromLocalStorage } from '@/utils/auth-storage';
import renderer from 'react-test-renderer';

jest.mock('@/utils/auth-storage', () => ({
  removeAuthUserFromLocalStorage: jest.fn(),
}));

describe('Sidebar component', () => {
  const user = {
    firstName: 'John',
    lastName: 'Doe',
    emailOrPhone: 'john.doe@example.com',
  };

  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <UserContext.Provider value={{ user, setUser: jest.fn() }}>
          <Sidebar />
        </UserContext.Provider>
      </BrowserRouter>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    renderComponent();
  });

  test('should match the snapshot', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <UserContext.Provider value={{ user, setUser: jest.fn() }}>
            <Sidebar />
          </UserContext.Provider>
        </BrowserRouter>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders user information when user is present', () => {
    const userNameElement = screen.getByText('John Doe');
    const userEmailElement = screen.getByText('john.doe@example.com');

    expect(userNameElement).toBeInTheDocument();
    expect(userEmailElement).toBeInTheDocument();
  });

  test('renders navigation links when user is present', () => {
    const updateInfoLink = screen.getByText('Update user info');
    const updatePasswordLink = screen.getByText('Update password');
    const githubReposLink = screen.getByText('Github repos');
    const logoutButton = screen.getByText('Logout');

    expect(updateInfoLink).toBeInTheDocument();
    expect(updatePasswordLink).toBeInTheDocument();
    expect(githubReposLink).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();
  });

  test('calls onLogout when logout button is clicked', () => {
    const logoutButton = screen.getByText('Logout');
    fireEvent.click(logoutButton);

    expect(removeAuthUserFromLocalStorage).toBeCalled();
  });

  test('does not render anything when user is not present', () => {
    const { container } = render(
      <BrowserRouter>
        <UserContext.Provider value={{ user: null, setUser: jest.fn() }}>
          <Sidebar />
        </UserContext.Provider>
      </BrowserRouter>,
    );

    expect(container.firstChild).toBeNull();
  });
});
