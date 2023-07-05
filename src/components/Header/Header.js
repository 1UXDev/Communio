import Language from "./HeaderComponents/Language";
import Filter from "./HeaderComponents/Filter";
import styled from "styled-components";
import UserLocation from "../UserLocation";
import useSWR from "swr";

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
  const { data, error, isLoading } = useSWR(`/api/users/bezirk`, {
    refreshInterval: 10000,
  });

  if (isLoading) {
    return "Loading...";
  }
  if (error) {
    console.log(error);
  }

  return (
    <HeaderSection>
      <HeaderSettings>
        <UserLocation
          includeSupportText={false}
          defaultLocation={data}
        ></UserLocation>
        <Language></Language>
      </HeaderSettings>
      <Filter></Filter>
    </HeaderSection>
  );
}
