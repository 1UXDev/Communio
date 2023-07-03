import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import useStore from "./globalstores";
import { useEffect, useState } from "react";
// Layout & Content
import Layout from "@/components/Layout/Layout";
import Header from "@/components/Header/Header";
import CardCarousel from "@/components/CardCarousel/CardCarousel";
import Editorial from "@/components/Editorial/Editorial";
import Banner from "@/components/Banner/Banner";
import Hello from "./hello";

export default function Home() {
  const bezirk = useStore((state) => state.bezirk) || [];
  const currentOrganizations =
    useStore((state) => state.currentOrganizations) || [];

  if (bezirk.length > 0) {
    return (
      <Layout>
        <Header></Header>
        <CardCarousel
          currentOrganizations={currentOrganizations}
        ></CardCarousel>
        <Banner></Banner>
        <Editorial></Editorial>
      </Layout>
    );
  } else {
    return <Hello></Hello>;
  }
}
