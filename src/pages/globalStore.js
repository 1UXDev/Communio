import { create } from "zustand";

// Globally Storing some Objects, this will be reduced once development progresses.
// e.g. the usersData, which holds all users data is currently only needed for the User-Selection in the App-Settings Component

const useStore = create((set) => ({
  //currentUserID: "",
  //currentUser: [],
  usersData: [],
  allOrganizations: [],
  currentOrganizations: [],
  productCounter: [],
  allProducts: [],
  setAllProducts: (products) => set({ allProducts: products }),
  //userOrganizationsWithProducts: [],
  //setUserOrganizationsWithProducts: (orgproducts) =>
  //set({ userOrganizationsWithProducts: orgproducts }),
  //setCurrentUserID: (id) => set({ currentUserID: id }), // setting the current userID, will be done by cookies in future
  //setCurrentUser: (user) => set({ currentUser: user }), // just current user
  setUsersData: (users) => set({ usersData: users }), // all Users
  setCurrentOrganizations: (organizations) =>
    set({ currentOrganizations: organizations }),
  setAllOrganizations: (organizations) =>
    set({ allOrganizations: organizations }),
  setProductCounter: (count) => set({ productCounter: count }),

  // -- I think it would be smarter to do this with the Location selection as a form, that sends a request body
  // -- These can still be useful, to show on custom selection "Donations around {currentLocation}"
  // currentLocation: "",
  // setCurrentLocation: (location) => set({ currentLocation: location }),
}));

export default useStore;
