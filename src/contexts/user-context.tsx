import React, { createContext, useContext, useState, ReactNode } from 'react';
import { PublicUser } from '@/interfaces/user';

// Context interface
interface IUserContext {
  user: PublicUser | null;
  setUser: (user: PublicUser | null) => void;
}

// Create the context
const UserContext = createContext<IUserContext | undefined>(undefined);

// Provider component
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<PublicUser | null>(null);

  const contextValue: IUserContext = {
    user,
    setUser,
  };

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

// Custom hook to use the user context
export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
};
