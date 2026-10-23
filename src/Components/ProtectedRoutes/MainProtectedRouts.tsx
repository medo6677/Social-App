import React, { useContext } from 'react'
import { TokenContext } from '../Context/TokenContext'
import { Navigate } from 'react-router'


export default function MainProtectedRouts({ children }: { children: React.ReactNode }) {

    const tokenContext = useContext(TokenContext);
    const token = tokenContext?.token;

    if (!token) {
        return <Navigate to="/auth/login" replace />;
    }

    return <>{children}</>
}
