import Layout from "@/components/Layout/Layout";
import { useStore } from "./globalstore";
import AppSettings from "@/components/AppSettings/AppSettings";
import { useEffect } from "react";

export default function Home({ usersData, organizationsData }) {
  // Zustand to make current-users data globally available
  // The data Fetching happens in the App.js but could also potentially moved somewhere else in the future

  function setAllOrganizationData(data) {
    useStore.setState({ allOrganizationData: data });
  }

  function setAllUserData(data) {
    useStore.setState({ allUserData: data });
  }

  useEffect(() => {
    setAllOrganizationData(organizationsData);
    setAllUserData(usersData);
  }, [organizationsData, usersData]);

  //set the current user, this will in the future be done by a cookie in the browser
  function setCurrentUserGlobal(event) {
    const currentUser = event.target.value;
    useStore.setState({ currentUserData: currentUser });
  }

  return (
    <>
      <AppSettings onSelect={setCurrentUserGlobal}></AppSettings>
      <Layout></Layout>
    </>
  );
}
