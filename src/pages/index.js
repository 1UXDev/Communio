import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import useStore from "./globalstores";
import { useEffect, useState } from "react";
import useSWR from "swr";
// Layout & Content
import Layout from "@/components/Layout/Layout";
import Header from "@/components/Header/Header";
import CardCarousel from "@/components/CardCarousel/CardCarousel";
import Editorial from "@/components/Editorial/Editorial";
import Banner from "@/components/Banner/Banner";
import Hello from "./hello";
import Loader from "@/components/Loader/Loader";

export default function Home() {
  const bezirk = useStore((state) => state.bezirk) || [];
  const currentOrganizations =
    useStore((state) => state.currentOrganizations) || [];

  const session = useSession();
  const router = useRouter();

  const {
    data: UserDataBezirk,
    error: UserError,
    isLoading: UserIsLoading,
  } = useSWR(`/api/users/bezirk`, {
    refreshInterval: 10000,
  });

  if (UserIsLoading) {
    return <Loader></Loader>;
  }
  if (UserError) {
    console.log(UserError);
  }

  if (!session) {
    router.push("/auth/signin");
  } else {
    if (UserDataBezirk) {
      console.log("userdatabezirk", UserDataBezirk);
      return (
        <Layout>
          <Header></Header>
          <CardCarousel
            currentOrganizations={currentOrganizations}
            showHeadline={true}
          ></CardCarousel>
          <Banner></Banner>
          <Editorial></Editorial>
        </Layout>
      );
    } else {
      return <Hello></Hello>;
    }
  }
}
