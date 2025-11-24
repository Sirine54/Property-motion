import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types/auth';

export interface UserState {
  user: User | null;
  token:string | null;
  setUser: (u: User) => void;
  updateUser: (partial: Partial<User>) => void;
  clearUser: () => void;
  setToken: (t: string) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      token:'',

      setUser: (u) => set({ user: u }),

      updateUser: (patch) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...patch } : null,
        })),
      setToken: (t) => set({ token : t}),

      clearUser: () => set({ user: null }),
    }),

    {
      name: 'pm-user',
      partialize: (state) => ({ user: state.user }),
    },
  ),
);

export default useUserStore;
