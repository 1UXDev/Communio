import { create } from "zustand";
import produce from "immer";

// Globally Storing some Objects, this will be reduced once development progresses.
// e.g. the usersData, which holds all users data is currently only needed for the User-Selection in the App-Settings Component

const useStore = create((set) => ({
  // ---------- The current user ----------
  usersData: [],
  setUsersData: (users) => set({ usersData: users }),

  bezirk: "",
  setBezirk: (bezirk) => set({ bezirk: bezirk }),

  // ---------- The Orgs around the users location ----------
  currentOrganizations: [],
  setCurrentOrganizations: (organizations) =>
    set({ currentOrganizations: organizations }),

  allOrganizations: [],
  setAllOrganizations: (organizations) =>
    set({ allOrganizations: organizations }),

  allProducts: [],
  setAllProducts: (products) => set({ allProducts: products }),

  // ---------- Stuff for the Cards ----------
  productCounter: [],
  setProductCounter: (count) => set({ productCounter: count }),

  likedProducts: [],
  setLikedProducts: (likes) => set({ likedProducts: likes }),
}));

export default useStore;
