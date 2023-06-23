import styled from "styled-components";
import useStore from "@/pages/globalstore";
import Link from "next/link";
import {
  CardWrapper,
  IMGwrapper,
  TEXTwrapper,
  IMGoverlay,
} from "../CardBase/styledCardBase";
import { uid } from "uid";

const ExploreSection = styled.section``;

export default function CardCarousel() {
  const usersData = useStore((state) => state.usersData) || [];

  if (!usersData || usersData.length < 3) {
    return <div>Loading...</div>;
  }

  // Store the to-be-combined data in some Variables
  const userOrgsProducts = [];
  const productArray = [];

  // Get the product the organization that is relevant for the user needs
  usersData[1].forEach((org) => {
    org.products.forEach((orgProduct) => {
      orgProduct = {
        ...orgProduct,
        organizationName: org.name,
        bezirk: org.bezirk,
      };
      userOrgsProducts.push(orgProduct);
    });
  });

  // Scan all products for the ones the organization needs
  userOrgsProducts.forEach((orgProduct) => {
    const filteredProducts = usersData[2].find(
      (product) => orgProduct.productId === product._id
    );

    // - add the found products values to the product-Array, together with the product related needs from the ORg (for this particular product)
    productArray.push({
      ...orgProduct,
      name: filteredProducts.name,
      pricePerPieceEuro: filteredProducts.pricePerPieceEuro,
      description: filteredProducts.description,
      productImage: filteredProducts.productImage,
      unit: filteredProducts.unit,
      weightSize: filteredProducts.weightSize,
    });
  });

  //console.log(productArray);

  return (
    <ExploreSection>
      <h2>➡️ Discover All Donations</h2>
      <CardWrapper>
        {productArray.map((product) => {
          return (
            <li key={uid()} className="small">
              {/* <Link href={`/products/${product.productId}`}> */}
              <IMGwrapper>
                <img src={product.productImage} alt={product.name} />
                <IMGoverlay>
                  <img src="/plus.png" alt="add to cart" width="50px"></img>
                  <h4>{product.organizationName}</h4>
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
              {/* </Link> */}
            </li>
          );
        })}
      </CardWrapper>
    </ExploreSection>
  );
}
