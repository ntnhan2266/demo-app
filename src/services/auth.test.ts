import { loginUser, registerUser, updateUserInfo, updateUserPassword } from '@/services/auth';
import * as userDatabase from '@/utils/mock-user-database';
import * as authStorage from '@/utils/auth-storage';

// Mock the modules
jest.mock('@/utils/mock-user-database');
jest.mock('@/utils/auth-storage');

// Extract the mocked modules
const mockUserDatabase = userDatabase as jest.Mocked<typeof userDatabase>;
const mockAuthStorage = authStorage as jest.Mocked<typeof authStorage>;

describe('auth service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('registerUser', () => {
    test('registers a user successfully', () => {
      const user = {
        firstName: 'New',
        lastName: 'User',
        emailOrPhone: 'new@example.com',
        password: 'qwerQWER1234!@',
      };

      // Mock the return value of registerUser from mock-user-database
      mockUserDatabase.registerUser.mockReturnValueOnce(true);

      // Call the registerUser function from the service
      const result = registerUser(user);

      // Assertions
      expect(result).toBe(true);

      // Ensure that registerUser is called with the user object
      expect(mockUserDatabase.registerUser).toHaveBeenCalledWith(user);
    });
  });

  describe('loginUser', () => {
    test('logs in a user successfully', () => {
      const emailOrPhone = 'test@example.com';
      const password = 'password123';
      const user = {
        firstName: 'New',
        lastName: 'User',
        emailOrPhone: 'new@example.com',
        password: 'qwerQWER1234!@',
      };

      mockUserDatabase.loginUser.mockReturnValueOnce(user);

      const result = loginUser(emailOrPhone, password);

      expect(result).toEqual(user);
      expect(mockUserDatabase.loginUser).toHaveBeenCalledWith(emailOrPhone, password);
      expect(mockAuthStorage.saveAuthUserToLocalStorage).toHaveBeenCalledWith(user);
    });

    test('returns null for unsuccessful login', () => {
      const emailOrPhone = 'test@example.com';
      const incorrectPassword = 'qwerQWER1234!@!';
      mockUserDatabase.loginUser.mockReturnValueOnce(null);

      const result = loginUser(emailOrPhone, incorrectPassword);

      expect(result).toBeNull();
      expect(mockUserDatabase.loginUser).toHaveBeenCalledWith(emailOrPhone, incorrectPassword);
      expect(authStorage.saveAuthUserToLocalStorage).not.toHaveBeenCalled();
    });
  });

  describe('updateUserInfo', () => {
    test('updates user info successfully', () => {
      const emailOrPhone = 'test@example.com';
      const updatedInfo = {
        firstName: 'New first name',
      };
      const updatedUser = {
        firstName: 'New first name',
        lastName: 'User',
        emailOrPhone: 'new@example.com',
        password: 'qwerQWER1234!@',
      };
      mockUserDatabase.updateUser.mockReturnValueOnce(updatedUser);

      const result = updateUserInfo(emailOrPhone, updatedInfo);

      expect(result).toEqual(updatedUser);
      expect(mockUserDatabase.updateUser).toHaveBeenCalledWith(emailOrPhone, updatedInfo);
      expect(authStorage.saveAuthUserToLocalStorage).toHaveBeenCalledWith(updatedUser);
    });

    test('returns null for unsuccessful update', () => {
      const nonExistentEmail = 'nonExistentUser@example.com';
      const updatedInfo = {
        firstName: 'New first name',
      };
      mockUserDatabase.updateUser.mockReturnValueOnce(null);

      const result = updateUserInfo(nonExistentEmail, updatedInfo);

      expect(result).toBeNull();
      expect(mockUserDatabase.updateUser).toHaveBeenCalledWith(nonExistentEmail, updatedInfo);
      expect(authStorage.saveAuthUserToLocalStorage).not.toHaveBeenCalled();
    });
  });

  describe('updateUserPassword', () => {
    test('updates user password successfully', () => {
      const emailOrPhone = 'test@example.com';
      const oldPassword = 'oldPassword';
      const newPassword = 'newPassword';
      mockUserDatabase.updatePassword.mockReturnValueOnce(true);

      const result = updateUserPassword(emailOrPhone, oldPassword, newPassword);

      expect(result).toBe(true);
      expect(mockUserDatabase.updatePassword).toHaveBeenCalledWith(emailOrPhone, oldPassword, newPassword);
    });

    test('returns false for unsuccessful password update', () => {
      const emailOrPhone = 'test@example.com';
      const incorrectOldPassword = 'qwerQWER1234#$';
      const newPassword = 'qwerQWER1234!@';
      mockUserDatabase.updatePassword.mockReturnValueOnce(false);

      const result = updateUserPassword(emailOrPhone, incorrectOldPassword, newPassword);

      expect(result).toBe(false);
      expect(mockUserDatabase.updatePassword).toHaveBeenCalledWith(emailOrPhone, incorrectOldPassword, newPassword);
    });
  });
});
