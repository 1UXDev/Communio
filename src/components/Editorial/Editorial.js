import styled from "styled-components";
import useStore from "@/pages/globalstore";
import Link from "next/link";
import { uid } from "uid";
import {
  CardWrapper,
  IMGwrapper,
  TEXTwrapper,
} from "../CardBase/styledCardBase";

const EditorialWrapper = styled.section``;

export default function Editorial() {
  const allOrganizations = useStore((state) => state.allOrganizations) || [];

  return (
    <EditorialWrapper>
      <Link href="/organizations">
        <h2>➡️ Get to know the Organizations</h2>
      </Link>
      <CardWrapper>
        {allOrganizations.map((org) => {
          return (
            <li key={uid()} className="large">
              <Link href={`/organizations/${org._id}`}>
                <IMGwrapper>
                  <img src={org.image} alt="" />
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
