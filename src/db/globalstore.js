import { create } from "zustand";

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
  globalProductCounter: [],
  setGlobalProductCounter: (count) => set({ globalProductCounter: count }),

  favorites: [],
  setFavorites: (like) => set({ favorites: like }),

  // ---------- CheckOut Stuff -----------
  amountToPay: [],
  setAmountToPay: (amount) => set({ amountToPay: amount }),
}));

export default useStore;
