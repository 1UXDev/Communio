import styled from "styled-components";
import useStore from "@/pages/globalstore";
import Link from "next/link";
import {
  CardWrapper,
  IMGwrapper,
  TEXTwrapper,
} from "../CardBase/styledCardBase";

const ExploreSection = styled.section``;

const IMGoverlay = styled.div`
  background-color: blue;
  background: linear-gradient(
    0deg,
    rgba(0, 20, 50, 1),
    rgba(0, 20, 50, 0) 100%
  );
  position: absolute;
  bottom: 0px;
  display: flex;
  flex-flow: row;
  align-items: flex-end;
  justify-content: space-between;
  padding: 8px;
  border-radius: 12px;

  & img {
    width: 20%;
    height: 20%;
  }
  & h4 {
    align-self: center;
    text-align: right;
    width: 70%;
    color: white;
    font-size: 0.8em;
  }
`;

export default function CardCarousel() {
  const allOrganizations = useStore((state) => state.allOrganizations);
  // This code will be amended to only display the items from orgs close to the user

  return (
    <ExploreSection>
      <h2>➡️ Discover All Donations</h2>

      <CardWrapper>
        {allOrganizations.map((org) => {
          return org.products.map((product) => {
            return (
              <li key={product.productId} className="small">
                <Link href={`/products/${product.productId}`}>
                  <IMGwrapper>
                    <img src={product.productImage} alt={product.name} />
                    <IMGoverlay>
                      <img src="/plus.png" alt="add to cart" width="50px"></img>
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
                </Link>
              </li>
            );
          });
        })}
      </CardWrapper>
    </ExploreSection>
  );
}
