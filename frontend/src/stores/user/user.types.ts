import type { User } from '@/types/auth';

export type UserState = {
  user: User | null;
  setUser: (u: User | null) => void;
  updateUser: (patch: Partial<User>) => void;
  clearUser: () => void;
};
