import styled from "styled-components";
import Link from "next/link";
import {
  CardWrapper,
  IMGwrapper,
  TEXTwrapper,
  IMGoverlay,
} from "../CardBase/styledCardBase";

const ExploreSection = styled.section``;

export default function CardCarousel({ organization }) {
  return (
    <ExploreSection>
      <h2>➡️ Discover All Donations</h2>

      <CardWrapper>
        {organization.map((org) => {
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
