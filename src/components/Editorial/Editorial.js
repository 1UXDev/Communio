import styled from "styled-components";
import useStore from "@/pages/globalstore";
import Link from "next/link";
import {
  CardWrapper,
  IMGwrapper,
  TEXTwrapper,
} from "../CardBase/styledCardBase";

const EditorialWrapper = styled.section``;
const StyledLink = styled.a`
  color: blue;
  font-weight: bold;
`;

export default function Editorial() {
  const allOrganizations = useStore((state) => state.allOrganizations);
  return (
    <EditorialWrapper>
      <Link href="/organizations">
        <h2>➡️ Get to know the Organizations</h2>
      </Link>
      <CardWrapper>
        {allOrganizations.map((org) => {
          return (
            <li key={org._id} className="large">
              <Link href={`/organizations/${org.name}`}>
                <IMGwrapper>
                  <img src={org.image}></img>
                </IMGwrapper>
                <TEXTwrapper>
                  <h3>{org.name}</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed diam voluptua.
                  </p>
                  <Link
                    href={`/organizations/${org._id}`}
                    passHref
                    legacyBehavior
                  >
                    <StyledLink>mehr →</StyledLink>
                  </Link>
                </TEXTwrapper>
              </Link>
            </li>
          );
        })}
      </CardWrapper>
    </EditorialWrapper>
  );
}
