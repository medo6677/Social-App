import React, { createContext, useState } from 'react'
import type { tokenContextType } from './Token.type';
import type { UserProfileT } from '../../Types/user.type';

export const TokenContext = createContext<tokenContextType>(null)
export default function TokenContextProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
    const [userData, setUserData] = useState<UserProfileT | null>(() => {
        const saved = localStorage.getItem("userData");
        return saved ? JSON.parse(saved) : null;
    });
    return (
        <TokenContext.Provider value={{ token, setToken, userData, setUserData }}>
            {children}
        </TokenContext.Provider>
    )
}
