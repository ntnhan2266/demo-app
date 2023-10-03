import {
  saveAuthUserToLocalStorage,
  getAuthUserFromLocalStorage,
  removeAuthUserFromLocalStorage,
} from '@/utils/auth-storage';
import { IUser } from '@/interfaces/user';

// Mock localStorage for testing
let localStorageMock: Record<string, string> = {};
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: (key: string) => localStorageMock[key] || null,
    setItem: (key: string, value: string) => {
      localStorageMock[key] = value;
    },
    removeItem: (key: string) => {
      delete localStorageMock[key];
    },
  },
});

describe('LocalStorage Functions', () => {
  beforeEach(() => {
    // Clear localStorage mock before each test
    localStorageMock = {};
  });

  test('should save and retrieve user data from localStorage', () => {
    const user: IUser = {
      firstName: 'John',
      lastName: 'Doe',
      emailOrPhone: 'john.doe@example.com',
      password: 'qwerQWER1234!@',
    };

    saveAuthUserToLocalStorage(user);

    const retrievedUser = getAuthUserFromLocalStorage();

    expect(retrievedUser).toEqual(user);
  });

  test('should return null if no user data in localStorage', () => {
    const retrievedUser = getAuthUserFromLocalStorage();

    expect(retrievedUser).toBeNull();
  });

  test('should remove user data from localStorage', () => {
    const user: IUser = {
      firstName: 'John',
      lastName: 'Doe',
      emailOrPhone: 'john.doe@example.com',
      password: 'qwerQWER1234!@',
    };

    saveAuthUserToLocalStorage(user);
    removeAuthUserFromLocalStorage();

    const retrievedUser = getAuthUserFromLocalStorage();

    expect(retrievedUser).toBeNull();
  });
});
