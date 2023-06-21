import styled from "styled-components";
import useStore from "@/pages/globalstore";
import Link from "next/link";

const CardWrapper = styled.ul`
  background-color: lightgrey;
  display: flex;
  flex-flow: row;
  padding: 24px 0px;
  margin: 24px 0px;
  & ul {
    list-style-type: none;
  }
  & img {
    width: 50px;
    height: 50px;
    object-fit: contain;
  }
`;

export default function CardCarousel() {
  const allOrganizations = useStore((state) => state.allOrganizations);
  // This code will be amended to only display the items from orgs close to the user

  return (
    <CardWrapper>
      {allOrganizations.map((org) => {
        return org.products.map((product) => {
          return (
            <li key={product.productId}>
              <Link href={`/products/${product.productId}`}>
                <img src={product.productImage} alt={product.name} />
                <h4>{product.name}</h4>
                <span>
                  Still Needed: {product.amountNeeded - product.amountSold}
                  {product.unit}
                </span>
                <p>
                  Donate {product.weightSize}
                  {product.unit} for {product.pricePerPieceEuro}€
                </p>
              </Link>
            </li>
          );
        });
      })}
    </CardWrapper>
  );
}
