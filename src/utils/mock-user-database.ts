import bcrypt from 'bcryptjs';
import { LOCALSTORAGE_KEY } from "@/constants/localstorage-key";
import { User } from "@/interfaces/user";

const getUsersFromLocalStorage = (): User[] => {
  const usersJson = localStorage.getItem(LOCALSTORAGE_KEY.USERS);
  return usersJson ? JSON.parse(usersJson) : [];
};

const saveUsersToLocalStorage = (users: User[]): void => {
  localStorage.setItem(LOCALSTORAGE_KEY.USERS, JSON.stringify(users));
};

export const registerUser = (user: User): boolean => {
  const users = getUsersFromLocalStorage();

  // Check if the email or phone is unique
  const isUnique = !users.some((u: User) => u.emailOrPhone === user.emailOrPhone);

  if (isUnique) {
    // Hash the password before saving the new user
    const hashedPassword = bcrypt.hashSync(user.password, 10);
    const newUser: User = {
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

export const loginUser = (emailOrPhone: string, password: string): User | null => {
  const users = getUsersFromLocalStorage();

  // Find the user with matching credentials
  const matchedUser = users.find(
    (u: User) => u.emailOrPhone === emailOrPhone && bcrypt.compareSync(password, u.password)
  );

  if (matchedUser) {
    return matchedUser; // Return user info upon successful login
  }

  return null; // Return null for unsuccessful login
};
