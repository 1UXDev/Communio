import styled from "styled-components";
import useStore from "@/pages/globalstores";
import {
  CardWrapper,
  IMGwrapper,
  TEXTwrapper,
  IMGoverlay,
} from "../CardBase/styledCardBase";
import { uid } from "uid";
import { useSession } from "next-auth/react";
import Counter from "../Counter/Counter";
import Favorite from "../Favorite/Favorite";

const ExploreSection = styled.section``;

export default function CardCarousel({ organizations }) {
  const usersData = useStore((state) => state.usersData);

  // ____ General Stuff _____

  if (!organizations || organizations.length < 1) {
    return <div>Loading...</div>;
  }

  if (!usersData || usersData.length < 1) {
    return <div>Loading...</div>;
  }

  return (
    <ExploreSection>
      <h2>➡️ Discover All Donations</h2>
      <CardWrapper>
        {organizations.map((org) => {
          return org.products.map((product) => {
            return (
              <li key={uid()} className="small">
                <IMGwrapper>
                  <img src={product.productImage} alt={product.name} />
                  <IMGoverlay>
                    <Favorite product={product}></Favorite>
                    <Counter
                      organizations={organizations}
                      usersData={usersData}
                      product={product}
                      org={org}
                    ></Counter>
                    <h4>{org.name}</h4>
                  </IMGoverlay>
                </IMGwrapper>
                <TEXTwrapper>
                  <span>{product.pricePerPieceEuro.toFixed(2)}€</span>
                  <h3>
                    {product.name}, {product.weightSize} {product.unit}
                  </h3>
                  <p>
                    Needed: {product.amountNeeded - product.amountSold}{" "}
                    {product.unit}
                  </p>
                </TEXTwrapper>
              </li>
            );
          });
        })}
      </CardWrapper>
    </ExploreSection>
  );
}
