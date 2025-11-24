import { useMutation } from '@tanstack/react-query';
import { axiosPublic } from '../../api/axios';
import type { User } from '@/types/auth';

export function useRegister() {
  return useMutation<User, Error, Record<string, any>>({
    mutationFn: async (payload) => {
      const res = await axiosPublic.post('/api/users/register', payload, { withCredentials: true });
      return res.data.data as User;
    },
  });
}