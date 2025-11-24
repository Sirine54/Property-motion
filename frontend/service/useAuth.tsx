import { useUserStore } from '@/stores/globalStore';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { axiosPrivate, axiosPublic, setAuthToken } from '../api/axios';
import { setAccessTokenGlobal } from '@/lib/token';

type User = {
  id: string;
  uid?: string | null;
  email: string;
  name?: string | null;
  businessName?: string | null;
  officeAddress?: string | null;
  postCode?: string | null;
  profileImage?: string | null;
  createdAt?: string;
  status?: string | null;
};

let accessTokenGlobal: string | null = null;

export function getAccessToken(): string | null {
  return accessTokenGlobal;
}

type AuthContextType = {
  user: User | null;
  accessToken: string | null;
  login: (token: string, userData: User) => void;
  logout: () => void;
  ready: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

  const setUser = useUserStore((s) => s.setUser);
  const clearUser = useUserStore((s) => s.clearUser);
  const setToken = useUserStore((s)=>s.setToken)
  const user = useUserStore((s) => s.user);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  const tryRefresh = useCallback(async () => {
    try {

      const res = await axiosPublic.post('/api/auth/refresh', {}, { withCredentials: true });
      const newToken = res.data?.accessToken;
      console.log("newToken",newToken)
      if (!newToken) {
        clearUser();
        setAccessToken(null);
        setAccessTokenGlobal(null);
        return;
      }

      setAccessToken(newToken);
      setAccessTokenGlobal(newToken);
      setAuthToken(newToken);

      try {
       const meRes = await axiosPrivate.get('/api/users/me', {
         headers: { Authorization: `Bearer ${newToken}` },
       });
       const userData = meRes.data;

        setUser(userData as User);
      } catch (meError: any) {
    
        clearUser();
        setAccessToken(null);
        setAccessTokenGlobal(null);
      }
    } catch (error: any) {
      clearUser();
      setAccessToken(null);
      setAccessTokenGlobal(null);
    } finally {
      setReady(true);
    }
  }, [setUser, clearUser]);

  useEffect(() => {
    tryRefresh();
  }, [tryRefresh]);

  const login = useCallback(
    async (token: string, userData: User) => {
      setAccessToken(token);
      setToken(token);
      setAccessTokenGlobal(token);
      setAuthToken(token);

      if (userData) {
        setUser(userData);
        return;
      }

      (async () => {
        try {
          const meRes = await axiosPrivate.get('/api/users/me');
          setUser(meRes.data);
        } catch (err) {
          console.error('Failed to fetch /me after login:', err);
        }
      })();
    },
    [setUser, setToken],
  );

  const logout = useCallback(async () => {
    try {
      await axiosPublic.post('/api/auth/logout', {}, { withCredentials: true });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      clearUser();
      setAccessToken(null);
      setAccessTokenGlobal(null);
      setAuthToken(undefined);
    }
  }, [clearUser]);

  return React.createElement(
    AuthContext.Provider,
    { value: { user, accessToken, login, logout, ready } },
    children,
  );
};

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
