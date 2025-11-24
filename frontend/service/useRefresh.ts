import { axiosPublic } from '../api/axios';
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


export type AuthData = {
  accessToken: string; 
  user?: User;
};

export type LoginResponse = {
  accessToken: string;
  user: User;
};

export type RefreshResponse = {
  accessToken: string;
};;

export async function refreshAccessToken(): Promise<string> {
  try {
    const res = await axiosPublic.post<{ accessToken: string }>(
      '/api/auth/refresh',
      {},
      { withCredentials: true },
    );
    
    const newToken = res.data?.accessToken;
    
    if (!newToken) {
      throw new Error('No access token received from refresh');
    }
    
    return newToken;
  } catch (error) {
    console.error('Token refresh failed:', error);
    throw error;
  }
}