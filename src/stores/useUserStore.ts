import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type UserRole = 'adik' | 'abang' | null

interface UserState {
  userRole: UserRole
  login: (role: UserRole) => void
  logout: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userRole: null,
      login: (role) => set({ userRole: role }),
      logout: () => set({ userRole: null }),
    }),
    {
      name: 'abangkakak-user-storage', // name of the item in localStorage
    }
  )
)