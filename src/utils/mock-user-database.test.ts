import bcrypt from 'bcryptjs';
import {
  registerUser,
  loginUser,
  updateUser,
  updatePassword,
} from './mock-user-database';
import { LOCALSTORAGE_KEY } from '@/constants/localstorage-key';

// Mock localStorage for testing
let localStorageMock: Record<string, string> = {};
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: (key: string) => localStorageMock[key] || null,
    setItem: (key: string, value: string) => {
      localStorageMock[key] = value;
    },
  },
});

describe('User Functions', () => {
  beforeEach(() => {
    // Clear localStorage mock before each test
    localStorageMock = {};
  });

  test('should register a new user', () => {
    const newUser = {
      firstName: 'New',
      lastName: 'User',
      emailOrPhone: 'new@example.com',
      password: 'qwerQWER1234!@',
    };

    const registered = registerUser(newUser);

    const usersJson = localStorageMock[LOCALSTORAGE_KEY.USERS];
    const savedUsers = usersJson ? JSON.parse(usersJson) : [];

    expect(registered).toBe(true);
    expect(savedUsers).toHaveLength(1);
    expect(savedUsers[0][0]).toBe(newUser.emailOrPhone);
  });

  test('should log in a user with correct credentials', () => {
    const existingUser = {
      firstName: 'Existing',
      lastName: 'User',
      emailOrPhone: 'existing@example.com',
      password: bcrypt.hashSync('qwerQWER1234!@', 10),
    };

    localStorageMock[LOCALSTORAGE_KEY.USERS] = JSON.stringify([[existingUser.emailOrPhone, existingUser]]);

    const loggedInUser = loginUser('existing@example.com', 'qwerQWER1234!@');

    expect(loggedInUser).toEqual(existingUser);
  });

  test('should not log in a user with incorrect credentials', () => {
    const existingUser = {
      firstName: 'Existing',
      lastName: 'User',
      emailOrPhone: 'existing@example.com',
      password: bcrypt.hashSync('qwerQWER1234!@', 10),
    };

    localStorageMock[LOCALSTORAGE_KEY.USERS] = JSON.stringify([[existingUser.emailOrPhone, existingUser]]);

    const loggedInUser = loginUser('existing@example.com', 'qwerQWER1234!@@');

    expect(loggedInUser).toBeNull();
  });

  test('should update user information', () => {
    const existingUser = {
      firstName: 'Existing',
      lastName: 'User',
      emailOrPhone: 'existing@example.com',
      password: bcrypt.hashSync('qwerQWER1234!@', 10),
    };

    localStorageMock[LOCALSTORAGE_KEY.USERS] = JSON.stringify([[existingUser.emailOrPhone, existingUser]]);

    const updatedInfo = {
      firstName: 'Updated',
      lastName: 'Info',
    };

    const updatedUser = updateUser(existingUser.emailOrPhone, updatedInfo);

    expect(updatedUser).toEqual({
      ...existingUser,
      ...updatedInfo,
    });

    const usersJson = localStorageMock[LOCALSTORAGE_KEY.USERS];
    const savedUsers = usersJson ? JSON.parse(usersJson) : [];

    expect(savedUsers).toHaveLength(1);
    expect(savedUsers[0][1]).toEqual({
      ...existingUser,
      ...updatedInfo,
    });
  });

  test('should update user password', () => {
    const existingUser = {
      firstName: 'Existing',
      lastName: 'User',
      emailOrPhone: 'existing@example.com',
      password: bcrypt.hashSync('qwerQWER1234!@', 10),
    };

    localStorageMock[LOCALSTORAGE_KEY.USERS] = JSON.stringify([[existingUser.emailOrPhone, existingUser]]);

    const oldPassword = 'qwerQWER1234!@';
    const newPassword = 'qwerQWER1234#$';

    const passwordUpdated = updatePassword(existingUser.emailOrPhone, oldPassword, newPassword);

    expect(passwordUpdated).toBe(true);

    const usersJson = localStorageMock[LOCALSTORAGE_KEY.USERS];
    const savedUsers = usersJson ? JSON.parse(usersJson) : [];

    const hashedNewPassword = bcrypt.hashSync(newPassword, 10);

    expect(savedUsers).toHaveLength(1);
    expect(savedUsers[0][1].password).toBe(hashedNewPassword);
  });

  test('should not update user password with incorrect old password', () => {
    const existingUser = {
      firstName: 'Existing',
      lastName: 'User',
      emailOrPhone: 'existing@example.com',
      password: bcrypt.hashSync('qwerQWER1234!@', 10),
    };

    localStorageMock[LOCALSTORAGE_KEY.USERS] = JSON.stringify([[existingUser.emailOrPhone, existingUser]]);

    const oldPassword = 'qwerQWER1234!@@';
    const newPassword = 'qwerQWER1234#$';

    const passwordUpdated = updatePassword(existingUser.emailOrPhone, oldPassword, newPassword);

    expect(passwordUpdated).toBe(false);

    const usersJson = localStorageMock[LOCALSTORAGE_KEY.USERS];
    const savedUsers = usersJson ? JSON.parse(usersJson) : [];

    // Ensure that the password remains unchanged
    expect(savedUsers).toHaveLength(1);
    expect(savedUsers[0][1].password).toBe(existingUser.password);
  });
});
