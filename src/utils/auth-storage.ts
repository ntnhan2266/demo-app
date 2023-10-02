import { LOCALSTORAGE_KEY } from '@/constants/localstorage-key';
import { IUser } from '@/interfaces/user';

// Convert user data to base64 string format
export const saveAuthUserToLocalStorage = (authUser: IUser): void => {
  const userString = btoa(JSON.stringify(authUser));
  localStorage.setItem(LOCALSTORAGE_KEY.AUTH_USER, userString);
};

export const getAuthUserFromLocalStorage = (): IUser | null => {
  const userString = localStorage.getItem(LOCALSTORAGE_KEY.AUTH_USER);

  if (userString) {
    try {
      // Decode the Base64-encoded string and parse it as JSON
      const decodedUserString = atob(userString);
      const authUser = JSON.parse(decodedUserString) as IUser;

      return authUser;
    } catch (error) {
      console.error('Error decoding or parsing user data:', error);
    }
  }

  return null;
};

export const removeAuthUserFromLocalStorage = (): void => {
  localStorage.removeItem(LOCALSTORAGE_KEY.AUTH_USER);
};
