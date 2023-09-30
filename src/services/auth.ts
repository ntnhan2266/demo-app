import { User } from '@/interfaces/user';
import { loginUser as mockLoginUser, registerUser as mockRegisterUser } from '@/utils/mock-user-database';

export const registerUser = (user: User): boolean => {
  // Just call mock function to simulate api call
  return mockRegisterUser(user);
};

export const loginUser = (emailOrPhone: string, password: string): User | null => {
  const matchedUser = mockLoginUser(emailOrPhone, password);

  if (matchedUser) {
    // Return user info upon successful login
    return matchedUser;
  }

  return null; // Return null for unsuccessful login
};
