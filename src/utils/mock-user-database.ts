import bcrypt from 'bcryptjs';
import { LOCALSTORAGE_KEY } from '@/constants/localstorage-key';
import { IUser } from '@/interfaces/user';

const getUsersFromLocalStorage = (): IUser[] => {
  const usersJson = localStorage.getItem(LOCALSTORAGE_KEY.USERS);
  return usersJson ? (JSON.parse(usersJson) as Array<IUser>) : [];
};

const saveUsersToLocalStorage = (users: IUser[]): void => {
  localStorage.setItem(LOCALSTORAGE_KEY.USERS, JSON.stringify(users));
};

export const registerUser = (user: IUser): boolean => {
  const users = getUsersFromLocalStorage();

  // Check if the email or phone is unique
  const isUnique = !users.some((u: IUser) => u.emailOrPhone === user.emailOrPhone);

  if (isUnique) {
    // Hash the password before saving the new user
    const hashedPassword = bcrypt.hashSync(user.password, 10);
    const newUser: IUser = {
      ...user,
      password: hashedPassword,
    };

    // Save the new user
    users.push(newUser);
    saveUsersToLocalStorage(users);
    return true; // Registration successful
  }

  return false; // Registration failed (email or phone is duplicated)
};

export const loginUser = (emailOrPhone: string, password: string): IUser | null => {
  const users = getUsersFromLocalStorage();

  // Find the user with matching credentials
  const matchedUser = users.find(
    (u: IUser) => u.emailOrPhone === emailOrPhone && bcrypt.compareSync(password, u.password),
  );

  if (matchedUser) {
    return matchedUser; // Return user info upon successful login
  }

  return null; // Return null for unsuccessful login
};
