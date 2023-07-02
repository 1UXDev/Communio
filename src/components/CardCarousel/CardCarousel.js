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

const ExploreSection = styled.section``;

export default function CardCarousel() {
  const usersData = useStore((state) => state.usersData);
  const currentOrganizations =
    useStore((state) => state.currentOrganizations) || [];

  // ____ General Stuff _____

  if (!currentOrganizations || currentOrganizations.length < 1) {
    return <div>Loading...</div>;
  }

  if (!usersData || usersData.length < 1) {
    return <div>Loading...</div>;
  }

  return (
    <ExploreSection>
      <h2>➡️ Discover All Donations</h2>
      <CardWrapper>
        {currentOrganizations.map((org) => {
          return org.products.map((product) => {
            return (
              <li key={uid()} className="small">
                <IMGwrapper>
                  <img src={product.productImage} alt={product.name} />
                  <IMGoverlay>
                    <Favorite
                      product={product}
                      org={org}
                      usersData={usersData}
                      organizations={currentOrganizations}
                    ></Favorite>
                    <Counter
                      organizations={currentOrganizations}
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
