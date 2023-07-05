import styled from "styled-components";
import useStore from "@/db/globalstore";
import {
  CardWrapper,
  IMGwrapper,
  TEXTwrapper,
  IMGoverlay,
} from "../CardBase/styledCardBase";
import { uid } from "uid";
import Counter from "../Counter/Counter";
import Favorite from "../Favorite/Favorite";
import useSWR from "swr";

const ExploreSection = styled.section`
  overflow-x: hidden;
`;

const SkeletonCard = styled.li`
  display: block;
  width: 154.5px;
  height: 289.5px;
  background-color: #f3f3f3;
`;

export default function CardCarousel({ currentOrganizations, showHeadline }) {
  const {
    data: favoritesOnServer,
    error: favoritesOnServerError,
    isLoading: favoritesOnServerIsLoading,
    mutate,
  } = useSWR(`/api/users/favorites`, {
    refreshInterval: 10000,
  });

  if (favoritesOnServerIsLoading) {
    return (
      <ExploreSection>
        {showHeadline && <h2>➡️ Discover All Donations</h2>}
        <CardWrapper>
          <SkeletonCard key="interim" className="small" />
        </CardWrapper>
      </ExploreSection>
    );
  } else {
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
                      <Counter product={product} org={org}></Counter>
                      <div className="textContainer">
                        <h4>{org.name}</h4>
                        <Favorite
                          product={product}
                          org={org}
                          favoritesOnServer={favoritesOnServer}
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
}
