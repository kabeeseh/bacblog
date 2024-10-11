'use client'
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import {User} from '../types';

// Create a User Context
const UserContext = createContext<{ user: User | null; setUser: React.Dispatch<React.SetStateAction<User | null>> } | undefined>(undefined);

const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== 'undefined') { // This ensures localStorage is only accessed in the browser
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null; // Default to null during SSR
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);


  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
