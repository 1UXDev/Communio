import Layout from "@/components/Layout/Layout";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Header from "@/components/Header/Header";
import CardCarousel from "@/components/CardCarousel/CardCarousel";
import Editorial from "@/components/Editorial/Editorial";
import Banner from "@/components/Banner/Banner";
import useStore from "./globalstores";

export default function Home() {
  const { data: session } = useSession();
  const currentOrganizations =
    useStore((state) => state.currentOrganizations) || [];
  const usersData = useStore((state) => state.usersData) || [];

  const router = useRouter();

  if (session) {
    if (usersData.isRecurring) {
      return (
        <Layout>
          <Header></Header>
          <CardCarousel organizations={currentOrganizations}></CardCarousel>
          <Banner></Banner>
          <Editorial></Editorial>
        </Layout>
      );
    } else {
      router.push("/hello");
    }
  } else router.push("/auth/signin");
}
