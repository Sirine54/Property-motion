import axios from 'axios';
import { getAccessTokenGlobal } from '@/lib/token';
import { useUserStore } from '@/stores/globalStore';

export const BASE_URL = (import.meta as any).env.VITE_BASE_URL;

export const axiosPublic = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

axiosPrivate.interceptors.request.use((config) => {
  const maybeGetState = (useUserStore as any).getState;
  const storedToken = typeof maybeGetState === 'function' ? maybeGetState().token : undefined;
  const token = getAccessTokenGlobal() || storedToken;
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
export function setAuthToken(token?: string | null) {
  if (token) {
    axiosPrivate.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosPrivate.defaults.headers.common['Authorization'];
  }
}
