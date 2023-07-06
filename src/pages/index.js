import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import useStore from "../db/globalstore";
import { useEffect, useState } from "react";
import useSWR from "swr";
// Layout & Content
import Layout from "@/components/Layout/Layout";
import Header from "@/components/Header/Header";
import CardCarousel from "@/components/CardCarousel/CardCarousel";
import Editorial from "@/components/Editorial/Editorial";
import Banner from "@/components/Banner/Banner";
import Loader from "@/components/Loader/Loader";

export default function Home() {
  const bezirk = useStore((state) => state.bezirk) || [];
  const currentOrganizations =
    useStore((state) => state.currentOrganizations) || [];
  const setCurrentOrganizations = useStore(
    (state) => state.setCurrentOrganizations
  );

  const session = useSession();
  const router = useRouter();

  const {
    data: UserDataBezirk,
    error: UserError,
    isLoading: UserIsLoading,
  } = useSWR(`/api/users/bezirk`, {
    refreshInterval: 10000,
  });

  const {
    data: OrganizationsBezirk,
    error: OrganizationsBezirkError,
    isLoading: OrganizationsBezirkIsLoading,
  } = useSWR(UserDataBezirk && `/api/organizations/bezirk/${UserDataBezirk}`, {
    refreshInterval: 10000,
  });

  useEffect(() => {
    if (OrganizationsBezirk) {
      setCurrentOrganizations(OrganizationsBezirk);
    }
  }, [OrganizationsBezirk, bezirk]);

  if (UserIsLoading || OrganizationsBezirkIsLoading || !currentOrganizations) {
    return <Loader></Loader>;
  }
  if (UserError || OrganizationsBezirkError) {
    console.log(UserError || OrganizationsBezirkError);
  }

  if (!session) {
    router.push("/auth/signin");
  } else {
    if (UserDataBezirk) {
      return (
        <Layout>
          <Header></Header>
          <CardCarousel
            currentOrganizations={currentOrganizations}
            showHeadline={true}
            UserDataBezirk={UserDataBezirk}
          ></CardCarousel>
          <Banner></Banner>
          <Editorial></Editorial>
        </Layout>
      );
    } else if (session) {
      //return <Hello></Hello>;
      router.push("/hello");
    } else {
      return "There was an Error :(";
    }
  }
}
