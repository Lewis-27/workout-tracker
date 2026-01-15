import { create } from "zustand";

const useUserStore = create((set) => ({
  user: localStorage.userInfo ? JSON.parse(localStorage.userInfo) : {},
  updateUserDetails: (userDetails) => set((state) => (state.user = userDetails)),
  logoutUser: () => set((state) => (state.user = {}))
}))

export {useUserStore}