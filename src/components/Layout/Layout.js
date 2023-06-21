import Header from "../Header/Header";
import CardCarousel from "../CardCarousel/CardCarousel";
import Editorial from "../Editorial/Editorial";
import Banner from "../Banner/Banner";
import useStore from "@/pages/globalstore";

export default function Layout() {
  const allOrganizations = useStore((state) => state.allOrganizations) || [];
  return (
    <>
      <Header></Header>
      <CardCarousel organization={allOrganizations}></CardCarousel>
      <Banner></Banner>
      <Editorial></Editorial>
    </>
  );
}
