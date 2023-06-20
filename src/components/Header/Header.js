import UserLocation from "./HeaderComponents/UserLocation";
import Language from "./HeaderComponents/Language";
import Filter from "./HeaderComponents/Filter";
import styled from "styled-components";
import AppSettings from "./HeaderComponents/AppSettings";

const HeaderContainer = styled.div`
  display: flex;
  flex-flow: column;
`;

const HeaderSettings = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

export default function Header() {
  return (
    <HeaderContainer>
      <AppSettings></AppSettings>
      <HeaderSettings>
        <UserLocation></UserLocation>
        <Language></Language>
      </HeaderSettings>
      <Filter></Filter>
    </HeaderContainer>
  );
}
