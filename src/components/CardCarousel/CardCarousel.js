import styled from "styled-components";
import useStore from "@/pages/globalstores";
import {
  CardWrapper,
  IMGwrapper,
  TEXTwrapper,
  IMGoverlay,
} from "../CardBase/styledCardBase";
import { uid } from "uid";
import Counter from "../Counter/Counter";
import Favorite from "../Favorite/Favorite";
import { Suspense } from "react";
import Loader from "@/components/Loader/Loader";

const ExploreSection = styled.section``;

export default function CardCarousel({ currentOrganizations, showHeadline }) {
  const usersData = useStore((state) => state.usersData);

  // ____ General Stuff _____

  if (!usersData || usersData.length < 1) {
    return "Loading";
  }

  return (
    <ExploreSection>
      {showHeadline && <h2>➡️ Discover All Donations</h2>}

      <CardWrapper>
        {currentOrganizations.map((org) => {
          return org.products.map((product) => {
            return (
              <li key={uid()} className="small">
                <IMGwrapper>
                  <img src={product.productImage} alt={product.name} />
                  <IMGoverlay>
                    <Counter
                      organizations={currentOrganizations}
                      usersData={usersData}
                      product={product}
                      org={org}
                    ></Counter>
                    <div className="textContainer">
                      <h4>{org.name}</h4>
                      <Favorite
                        product={product}
                        org={org}
                        usersData={usersData}
                        organizations={currentOrganizations}
                        favorites={usersData.favorites}
                      ></Favorite>
                    </div>
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
