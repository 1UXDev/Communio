import UserLocation from "./HeaderComponents/UserLocation";
import Language from "./HeaderComponents/Language";
import Filter from "./HeaderComponents/Filter";
import styled from "styled-components";

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
  return (
    <HeaderSection>
      <HeaderSettings>
        <UserLocation></UserLocation>
        <Language></Language>
      </HeaderSettings>
      <Filter></Filter>
    </HeaderSection>
  );
}
