import { create } from "zustand";

const useUserStore = create((set) => ({
  user: {},
  updateUserDetails: (userDetails) => set((state) => (state.user = userDetails)),
  logoutUser: () => set((state) => (state.user = {}))
}))

export {useUserStore}