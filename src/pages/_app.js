import "@/styles/globals.css";
import Nav from "@/components/Nav/Nav";
import useSWR, { SWRConfig } from "swr";
import { useEffect } from "react";
import useStore from "./globalstore";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function App({ Component, pageProps }) {
  const setUsersData = useStore((state) => state.setUsersData);

  const { data, error, isLoading } = useSWR("/api/", fetcher);

  useEffect(() => {
    setUsersData(data);
    console.log(data);
  }, [data]);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <SWRConfig
      value={{
        fetcher,
        refreshInterval: 1000,
      }}
    >
      <Component {...pageProps} />
      <Nav></Nav>
    </SWRConfig>
  );
}
