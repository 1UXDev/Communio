import styled from "styled-components";
import useStore from "@/db/globalstore";
import Link from "next/link";
import { uid } from "uid";
import {
  CardWrapper,
  IMGwrapper,
  TEXTwrapper,
} from "../CardBase/styledCardBase";

const EditorialWrapper = styled.section``;

export default function Editorial() {
  const currentOrganizations =
    useStore((state) => state.currentOrganizations) || [];

  if (!currentOrganizations || currentOrganizations.length < 1) {
    return <div>Loading...</div>;
  }

  return (
    <EditorialWrapper>
      <h2>➡️ Meet Charity Organizations in {currentOrganizations[0].bezirk}</h2>

      <CardWrapper>
        {currentOrganizations.map((org) => {
          return (
            <li key={uid()} className="large">
              <Link href={`/organizations/${org._id}`}>
                <IMGwrapper>
                  <img src={org.image} alt="image of orgnaization" />
                </IMGwrapper>
                <TEXTwrapper>
                  <h3>{org.name}</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed diam voluptua.
                  </p>
                </TEXTwrapper>
              </Link>
              <Link href={`/organizations/${org._id}`} passHref>
                <span>mehr →</span>
              </Link>
            </li>
          );
        })}
      </CardWrapper>
    </EditorialWrapper>
  );
}
