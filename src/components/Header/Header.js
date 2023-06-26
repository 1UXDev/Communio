import UserLocation from "./HeaderComponents/UserLocation";
import Language from "./HeaderComponents/Language";
import Filter from "./HeaderComponents/Filter";
import styled from "styled-components";
import useStore from "@/pages/globalstore";

const HeaderSection = styled.section`
  display: flex;
  flex-flow: column;
  gap: 6px;
`;

const HeaderSettings = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

export default function Header() {
  const usersData = useStore((state) => state.usersData) || [];

  if (!usersData || usersData.length < 3) {
    return <div>Loading...</div>;
  }

  return (
    <HeaderSection>
      <HeaderSettings>
        <UserLocation currentUser={usersData}></UserLocation>
        <Language currentUser={usersData}></Language>
      </HeaderSettings>
      <Filter currentUser={usersData}></Filter>
    </HeaderSection>
  );
}
