import "@/styles/globals.css";
import { roboto_condensed, raleway } from "@/styles/fonts";
import { SWRConfig } from "swr";
import { useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import { createGlobalStyle } from "styled-components";
import { useRouter } from "next/router";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function App({ Component, pageProps, session, status }) {
  const router = useRouter();

  useEffect(() => {
    if (status !== "authenticated") {
      // Redirect to signin
      router.push("/auth/signin");
    }
  }, []);

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
