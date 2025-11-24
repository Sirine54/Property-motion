import { useMutation } from '@tanstack/react-query';
import { axiosPublic } from '../../api/axios';
import { useAuth } from '../../service/useAuth';
import type { AuthData, User } from '@/types/auth';
type LoginResponse =
  | { statusCode?: number; success?: boolean; data?: { token?: string; user?: User } }
  | { accessToken?: string; token?: string; user?: User }
  | any;
export function useLogin() {
  const auth = useAuth();

  return useMutation<AuthData | any, Error, { email: string; password: string }>({
    mutationFn: async (payload) => {
      const res = await axiosPublic.post('/api/auth/login', payload, { withCredentials: true });
      const body: LoginResponse = res.data;

      if (body?.data && (body.data.token || body.data.accessToken || body.data.user)) {
        return {
          token: body.data.token ?? body.data.accessToken,
          user: body.data.user,
        } as AuthData;
      }
      if (body?.accessToken || body?.token) {
        return {
          token: body.accessToken ?? body.token,
          user: body.user,
        } as AuthData;
      }

      return res.data as AuthData;
    },
    onSuccess: (data) => {
      if (data && (data.token || data.accessToken) && data.user) {
        const token = (data.token as string) ?? (data.accessToken as string);
        auth.login(token, data.user as User);
      } else {
        console.error('useLogin.onSuccess: unexpected response shape', data);
      }
    },
  });
}