import { SWRConfig } from "swr";
import useSWR from "swr";
import Layout from "@/components/Layout/Layout";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home() {
  //const { data, error, isLoading } = useSWR("/api/organizations", fetcher);
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

  if (organizationsError || usersError) return <div>failed to load</div>;
  if (organizationsIsLoading || usersIsLoading) return <div>loading...</div>;

  return (
    <SWRConfig
      value={{
        fetcher,
        refreshInterval: 1000,
      }}
    >
      {usersData.map((user) => {
        return <li>{user.name}</li>;
      })}
      {organizationsData.map((org) => {
        return <li>{org.street}</li>;
      })}
      <Layout></Layout>
    </SWRConfig>
  );
}
