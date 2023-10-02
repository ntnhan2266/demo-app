import React, { createContext, useState, ReactNode } from 'react';
import { PublicUser } from '@/interfaces/user';

// Context interface
interface IUserContext {
  user: PublicUser | null;
  setUser: (_user: PublicUser | null) => void;
}

// Create the context
export const UserContext = createContext<IUserContext | undefined>(undefined);

// Provider component
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<PublicUser | null>(null);

  const contextValue: IUserContext = {
    user,
    setUser,
  };

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};
