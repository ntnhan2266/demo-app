import bcrypt from 'bcryptjs';
import { LOCALSTORAGE_KEY } from '@/constants/localstorage-key';
import { IUser } from '@/interfaces/user';

const getUsersFromLocalStorage = (): Map<string, IUser> => {
  const usersJson = localStorage.getItem(LOCALSTORAGE_KEY.USERS);
  const users = (usersJson ? JSON.parse(usersJson) : []) as [string, IUser][];

  // Convert the array to a map for efficient queries
  const usersMap = new Map<string, IUser>(users);
  return usersMap;
};

const saveUsersToLocalStorage = (users: Map<string, IUser>): void => {
  const usersArray = Array.from(users.entries());
  localStorage.setItem(LOCALSTORAGE_KEY.USERS, JSON.stringify(usersArray));
};

export const registerUser = (user: IUser): boolean => {
  const usersMap = getUsersFromLocalStorage();

  // Check if the email or phone is unique
  if (!usersMap.has(user.emailOrPhone)) {
    // Hash the password before saving the new user
    const hashedPassword = bcrypt.hashSync(user.password, 10);
    const newUser: IUser = {
      ...user,
      password: hashedPassword,
    };

    // Save the new user
    usersMap.set(newUser.emailOrPhone, newUser);
    saveUsersToLocalStorage(usersMap);
    return true; // Registration successful
  }

  return false; // Registration failed (email or phone is duplicated)
};

export const loginUser = (emailOrPhone: string, password: string): IUser | null => {
  const usersMap = getUsersFromLocalStorage();

  // Find the user with matching credentials
  const matchedUser = usersMap.get(emailOrPhone);

  if (matchedUser && bcrypt.compareSync(password, matchedUser.password)) {
    return matchedUser; // Return user info upon successful login
  }

  return null; // Return null for unsuccessful login
};

export const updateUser = (emailOrPhone: string, updatedInfo: Partial<Omit<IUser, 'password'>>): IUser | null => {
  const usersMap = getUsersFromLocalStorage();

  // Find the user with the specified emailOrPhone
  const userToUpdate = usersMap.get(emailOrPhone);

  if (userToUpdate) {
    // Update the user's information
    const updatedUser: IUser = {
      ...userToUpdate,
      ...updatedInfo,
    };

    // Save the updated user back to the map
    usersMap.set(emailOrPhone, updatedUser);

    // Save the updated map back to local storage
    saveUsersToLocalStorage(usersMap);

    return updatedUser; // Update successful
  }

  return null; // User not found (update failed)
};

export const updatePassword = (emailOrPhone: string, oldPassword: string, newPassword: string): boolean => {
  const usersMap = getUsersFromLocalStorage();

  // Find the user with the specified emailOrPhone
  const userToUpdate = usersMap.get(emailOrPhone);

  if (userToUpdate && bcrypt.compareSync(oldPassword, userToUpdate.password)) {
    // If the old password matches, hash the new password
    const hashedNewPassword = bcrypt.hashSync(newPassword, 10);

    // Update the user's password
    const updatedUser: IUser = {
      ...userToUpdate,
      password: hashedNewPassword,
    };

    // Save the updated user back to the map
    usersMap.set(emailOrPhone, updatedUser);

    // Save the updated map back to local storage
    saveUsersToLocalStorage(usersMap);

    return true; // Password update successful
  }

  return false; // User not found or old password does not match (password update failed)
};
