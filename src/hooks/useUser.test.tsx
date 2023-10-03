import React from 'react';
import { RenderHookResult } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { UserContext, IUserContext } from '@/contexts/UserContext';
import { useUser } from '@/hooks/useUser';

const TestComponent: React.FC<{ value: IUserContext; children: React.ReactNode }> = ({ value, children }) => (
  <UserContext.Provider value={value}>{children}</UserContext.Provider>
);

describe('useUser', () => {
  test('UserProvider should provide user context', () => {
    const { result }: RenderHookResult<unknown, { value: IUserContext; children: React.ReactNode }> = renderHook(
      () => useUser(),
      {
        wrapper: ({ children }) => <TestComponent value={{ user: null, setUser: jest.fn() }}>{children}</TestComponent>,
      },
    );

    // Assert that the hook receives the user context from the provider
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    expect(result.current).toEqual({ user: null, setUser: expect.any(Function) });
  });

  test('useUser should throw an error outside UserProvider', () => {
    // Render the hook without UserProvider
    const { result } = renderHook(() => useUser());

    // Expect an error to be thrown
    expect(result.error).toEqual(Error('useUser must be used within a UserProvider'));
  });
});
