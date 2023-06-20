import { create } from "zustand";

const useStore = create((set) => ({
  userData: {}, // Set your initial userData state here
  setUserData: (newUserData) => set(() => ({ userData: newUserData })),
}));

export default useUserStore;
