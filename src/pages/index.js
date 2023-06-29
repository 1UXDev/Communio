import Layout from "@/components/Layout/Layout";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Header from "@/components/Header/Header";
import CardCarousel from "@/components/CardCarousel/CardCarousel";
import Editorial from "@/components/Editorial/Editorial";
import Banner from "@/components/Banner/Banner";

export default function Home() {
  const { data: session } = useSession();

  const router = useRouter();

  if (session) {
    return (
      <Layout>
        <Header></Header>
        <CardCarousel></CardCarousel>
        <Banner></Banner>
        <Editorial></Editorial>
      </Layout>
    );
  } else router.push("/auth/signin");
}
