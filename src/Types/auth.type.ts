import type React from 'react';
import type { UserProfileT } from './user.type';

export type tokenContextType = {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  userData: UserProfileT | null;
  setUserData: React.Dispatch<React.SetStateAction<UserProfileT | null>>;
} | null;

export type TokenContextType = tokenContextType;
