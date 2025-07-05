'use client'

import React, {createContext, useContext, 
    useState, useEffect, ReactNode} from 'react';
import axios from 'axios';
import { logoutUser } from '@/utils/api/auth';

interface User {
    id: number;
    username: string;
    email: string;
}

interface loginResponce {
    access: string;
    refresh: string;
    user: {
        id: number;
        username: string;
        email: string;
    };
}

interface AuthContextType {
    user: User | null;
    login: (data: unknown) => void;
    logout: () => void;
    loading: boolean;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: {children: ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
            const checkLogInState = () => {
                try {
                    const storedUser = localStorage.getItem('user');
                    const accessToken = localStorage.getItem('access_token');

                    if (storedUser && accessToken) {
                        setUser(JSON.parse(storedUser));
                    }
                } catch (error) {
                    console.error("Error: ", error);
                    const refreshToken = localStorage.getItem('refresh_token');
                    if (refreshToken !== null)
                        logoutUser(refreshToken);
                } finally {
                    setLoading(false);
                }
            };

            checkLogInState();
        }, []);

    const login = (data: unknown) => {
        const responseData = data as loginResponce
        localStorage.setItem('access_token', responseData.access);
        localStorage.setItem('refresh_token', responseData.refresh);
        localStorage.setItem('user', JSON.stringify(responseData.user));
        
        setUser(responseData.user);

        window.location.href = '/';
    };

    const logout = async () => {
        try {
            const refreshToken = localStorage.getItem('refresh_token');
            if (refreshToken) {
                await axios.post('http://localhost:8000/api/auth/logout/', {
                refresh: refreshToken,
                });
            }
        } catch (error) {
      console.error('Logout failed on server', error);
    } finally {
      
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
      setUser(null);
     

      window.location.href = '/login';
    }
  };

  const value = {user, login, logout, loading};

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};