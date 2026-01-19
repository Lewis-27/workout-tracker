import { create } from "zustand";

const useWorkoutStore = create((set) => ({
  workouts: [],
  setWorkouts: (updatedWorkouts) => set((state) => (state.workouts = updatedWorkouts)),
  clearWorkouts: () => set((state) => (state.workouts = []))
}))

export {useWorkoutStore}