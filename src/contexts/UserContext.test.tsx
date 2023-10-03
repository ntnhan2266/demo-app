import { render, act } from '@testing-library/react';
import { UserProvider, UserContext, IUserContext } from './UserContext';
import { PublicUser } from '@/interfaces/user';

// Dummy user for testing
const testUser: PublicUser = {
  firstName: 'John',
  lastName: 'Doe',
  emailOrPhone: 'john.doe@example.com',
};

describe('UserContext', () => {
  test('should provide user context with initial null user', () => {
    let contextValue: IUserContext | undefined;

    render(
      <UserProvider>
        <UserContext.Consumer>
          {(value) => {
            contextValue = value;
            return null;
          }}
        </UserContext.Consumer>
      </UserProvider>,
    );

    expect(contextValue).toEqual({
      user: null,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      setUser: expect.any(Function),
    });
  });

  test('should update user context when setUser is called', () => {
    let contextValue: IUserContext | undefined;

    render(
      <UserProvider>
        <UserContext.Consumer>
          {(value) => {
            contextValue = value;
            return null;
          }}
        </UserContext.Consumer>
      </UserProvider>,
    );

    expect(contextValue).toEqual({
      user: null,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      setUser: expect.any(Function),
    });

    // Update user using setUser
    act(() => {
      contextValue?.setUser(testUser);
    });

    expect(contextValue).toEqual({
      user: testUser,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      setUser: expect.any(Function),
    });
  });
});
