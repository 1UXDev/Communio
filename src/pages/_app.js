import "@/styles/globals.css";
import useSWR, { SWRConfig } from "swr";
import { useEffect, useState } from "react";
import useStore from "./globalstore";
import { SessionProvider } from "next-auth/react";
import { createGlobalStyle } from "styled-components";
import "typeface-inter";
import "typeface-roboto";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function App({ Component, pageProps, session }) {
  const setUsersData = useStore((state) => state.setUsersData);
  const setCurrentOrganizations = useStore(
    (state) => state.setCurrentOrganizations
  );
  const currentLocation = useStore((state) => state.currentLocation);
  const currentOrganizations = useStore((state) => state.currentOrganizations);
  const setAllProducts = useStore((state) => state.setAllProducts);

  const { data, error, isLoading } = useSWR("/api/", fetcher);

  useEffect(() => {
    if (data) {
      setUsersData(data[0]);
      setCurrentOrganizations(data[1]);
      setAllProducts(data[2]);
    }
  }, [data, currentLocation]);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <SessionProvider session={session}>
      <SWRConfig
        value={{
          fetcher,
          refreshInterval: 1000,
        }}
      >
        <GlobalStyles />
        <Component {...pageProps} />
      </SWRConfig>
    </SessionProvider>
  );
}

const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Inter', sans-serif;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Roboto', sans-serif;
  }
`;
