import { IUser } from '@/interfaces/user';
import { saveAuthUserToLocalStorage } from '@/utils/auth-storage';
import {
  loginUser as mockLoginUser,
  registerUser as mockRegisterUser,
  updateUser as mockUpdateUser,
  updatePassword as mockUpdatePassword,
} from '@/utils/mock-user-database';

export const registerUser = (user: IUser): boolean => {
  // Just call mock function to simulate api call
  return mockRegisterUser(user);
};

export const loginUser = (emailOrPhone: string, password: string): IUser | null => {
  const matchedUser = mockLoginUser(emailOrPhone, password);

  if (matchedUser) {
    // Save auth user info
    saveAuthUserToLocalStorage(matchedUser);

    // Return user info upon successful login
    return matchedUser;
  }

  return null; // Return null for unsuccessful login
};

export const updateUserInfo = (emailOrPhone: string, updatedInfo: Partial<IUser>): IUser | null => {
  // Just call mock function to simulate api call
  const updatedUser = mockUpdateUser(emailOrPhone, updatedInfo);

  if (updatedUser) {
    // Update auth user info
    saveAuthUserToLocalStorage(updatedUser);

    // Return user info upon successful login
    return updatedUser;
  }

  return null;
};

export const updateUserPassword = (emailOrPhone: string, oldPassword: string, newPassword: string): boolean => {
  // Just call mock function to simulate api call
  return mockUpdatePassword(emailOrPhone, oldPassword, newPassword);
};
