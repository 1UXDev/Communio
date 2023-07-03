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
  const usersData = useStore((state) => state.usersData) || [];
  const currentOrganizations =
    useStore((state) => state.currentOrganizations) || [];
  if (!currentOrganizations || currentOrganizations.length < 1) {
    return <div>Loading...</div>;
  }

  // const router = useRouter();
  //https://stackoverflow.com/questions/68527682/how-to-redirect-in-nextjs-if-not-logged-using-nextauth
  if (session) {
    if (usersData.isRecurring) {
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
      console.log("hello"); //router.push("/hello")
    }
  } else console.log("signin"); //router.push("/auth/signin");
}
