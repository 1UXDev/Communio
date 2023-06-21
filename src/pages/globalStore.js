import { create } from "zustand";

// Globally Storing some Objects, this will be reduced once development progresses.
// e.g. the usersData, which holds all users data is currently only needed for the User-Selection in the App-Settings Component

const useStore = create((set) => ({
  currentUserID: "",
  currentUser: [],
  usersData: [],
  allOrganizations: [],
  currentOrganizations: [],
  setCurrentUserID: (id) => set({ currentUserID: id }), // setting the current userID, will be done by cookies in future
  setCurrentUser: (user) => set({ currentUser: user }), // just current user
  setUsersData: (users) => set({ usersData: users }), // all Users
  setCurrentOrganizations: (organizations) =>
    set({ currentOrganizations: organizations }),
  setAllOrganizations: (organizations) =>
    set({ allOrganizations: organizations }),
}));

export default useStore;
