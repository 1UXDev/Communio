import "@/styles/globals.css";
import Nav from "@/components/Nav/Nav";
import useSWR, { SWRConfig } from "swr";
import { useEffect } from "react";
import useStore from "./globalstore";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function App({ Component, pageProps }) {
  const currentUser = useStore((state) => state.currentUser);
  const setCurrentUser = useStore((state) => state.setCurrentUser);
  const setAllOrganizations = useStore((state) => state.setAllOrganizations);
  const setUsersData = useStore((state) => state.setUsersData);

  const {
    data: organizationsData,
    error: organizationsError,
    isLoading: organizationsIsLoading,
  } = useSWR("/api/organizations", fetcher);
  const {
    data: usersData,
    error: usersError,
    isLoading: usersIsLoading,
  } = useSWR("/api/users", fetcher);

  useEffect(() => {
    setUsersData(usersData);
    setAllOrganizations(organizationsData);
    if (!currentUser._id && usersData) {
      setCurrentUser(usersData[0]);
    }
  }, [usersData, organizationsData]);

  if (organizationsError || usersError) return <div>failed to load</div>;
  if (organizationsIsLoading || usersIsLoading) return <div>loading...</div>;

  return (
    <SWRConfig
      value={{
        fetcher,
        refreshInterval: 1000,
      }}
    >
      <Component
        {...pageProps}
        usersData={usersData}
        organizationsData={organizationsData}
      />
      <Nav></Nav>
    </SWRConfig>
  );
}
