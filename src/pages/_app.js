import "@/styles/globals.css";
import { roboto_condensed, raleway } from "@/styles/fonts";
import useSWR, { SWRConfig } from "swr";
import { useEffect, useState } from "react";
import useStore from "./globalstores";
import { SessionProvider } from "next-auth/react";
import { createGlobalStyle } from "styled-components";
import Loader from "@/components/Loader/Loader";
import { useRouter } from "next/router";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function App({ Component, pageProps, session, status }) {
  const setUsersData = useStore((state) => state.setUsersData);
  const setCurrentOrganizations = useStore(
    (state) => state.setCurrentOrganizations
  );
  const bezirk = useStore((state) => state.bezirk);
  const setAllProducts = useStore((state) => state.setAllProducts);
  const setGlobalProductCounter = useStore(
    (state) => state.setGlobalProductCounter
  );

  const router = useRouter();

  useEffect(() => {
    if (status !== "authenticated") {
      // Redirect to signin
      router.push("/auth/signin");
    }
  }, []);

  const { data, error, isLoading } = useSWR("/api/users", fetcher);

  useEffect(() => {
    console.log("reloaded in app");
    if (data) {
      setUsersData(data);
      data && setGlobalProductCounter(data.productCounter);
    }
  }, [data]);

  // const { data, error, isLoading } = useSWR("/api/", fetcher);
  // useEffect(() => {
  //   console.log("reloaded in app");
  //   if (data) {
  //     setUsersData(data[0]);
  //     setCurrentOrganizations(data[1]);
  //     setAllProducts(data[2]);
  //     data[0] && setGlobalProductCounter(data[0].productCounter);
  //   }
  // }, [data]);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <Loader />;

  return (
    <SessionProvider session={session}>
      <SWRConfig
        value={{
          fetcher,
          refreshInterval: 10000,
        }}
      >
        <GlobalStyles />
        <Component {...pageProps} />
      </SWRConfig>
    </SessionProvider>
  );
}

const GlobalStyles = createGlobalStyle`
  body, button, select {
    font-family: ${raleway.style.fontFamily};
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${roboto_condensed.style.fontFamily};
    font-weight: "700";
  }
`;
