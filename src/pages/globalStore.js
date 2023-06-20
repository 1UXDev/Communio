import { create } from "zustand";

export const useStore = create((set) => ({
  // Globally Setting all-users object
  allUserData: {},
  setAllUserData: (newAllUserData) => set({ allUserData: newAllUserData }),

  // Globally Setting all-organizations object
  allOrganizationData: {},
  setAllOrganizationData: (newOrganizationData) =>
    set({ allOrganizationData: newOrganizationData }),

  // Globally Setting current-user object
  currentUserData: {},
  setCurrentUserData: (newUserData) => set({ currentUserData: newUserData }),
}));
