import styled from "styled-components";
import useStore from "@/pages/globalstores";
import Link from "next/link";
import {
  CardWrapper,
  IMGwrapper,
  TEXTwrapper,
  IMGoverlay,
  ClickerWrapper,
} from "../CardBase/styledCardBase";
import { uid } from "uid";
import { useEffect, useState } from "react";

const ExploreSection = styled.section``;

export default function CardCarousel() {
  const currentOrganizations =
    useStore((state) => state.currentOrganizations) || [];
  const usersData = useStore((state) => state.usersData);

  // Counter
  const productCounter = useStore((state) => state.productCounter) || [];
  const setProductCounter = useStore((state) => state.setProductCounter) || [];

  // ____ Likes Stuff ____
  const likedProducts = useStore((state) => state.likedProducts) || [];
  const setLikedProducts = useStore((state) => state.setLikedProducts) || [];

  function onLike(id, org) {
    likedProducts.find((product) => product.id === id)
      ? setLikedProducts(
          likedProducts.filter((likedProduct) => likedProduct.id !== id)
        )
      : setLikedProducts([...likedProducts, { id: id, org: org }]);
  }

  // // ------- The likes currently only work locally, the connection to the server did not work, will find out tomorrow why...
  // useEffect(() => {
  //   updateLikesOnServer();
  // }, [likedProducts]);
  // async function updateLikesOnServer() {
  //   try {
  //     const method = likedProducts.length > 0 ? "PATCH" : "POST";

  //     console.log("serverfunct", likedProducts);
  //     const response = await fetch("/api/likes", {
  //       method,
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(likedProducts),
  //     });

  //     if (response.ok) {
  //       console.log("yay :)");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // ____ Stuff for the counters ____
  useEffect(() => {
    if (!productCounter || productCounter.length === 0) {
      let newProductCounter = currentOrganizations.flatMap((org) =>
        org.products.map((product) => ({
          id: product.productId + ";;" + org.name,
          org: org.name,
          count: 0,
        }))
      );
      setProductCounter(newProductCounter);
    } else {
      null;
    }
  }, [currentOrganizations, productCounter]);

  // note: the clickedId is a combination of a static product-identifier(productId) + ; + the name of the organization, since multiple orgs can have the same product-need and we need to be able to split it again (thus the ";;")
  function incrementCounter(clickedId) {
    console.log(productCounter);
    const updatedProductCounter = productCounter.map((product) =>
      product.id === clickedId
        ? { ...product, count: product.count + 1 }
        : product
    );
    setProductCounter(updatedProductCounter);
  }

  function decrementCounter(clickedId) {
    const updatedProductCounter = productCounter.map((product) =>
      product.id === clickedId && product.count > 0
        ? { ...product, count: product.count - 1 }
        : product
    );
    setProductCounter(updatedProductCounter);
  }

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
                {/* <Link href={`/products/${product.productId}`}> */}
                <IMGwrapper>
                  <img src={product.productImage} alt={product.name} />
                  <IMGoverlay>
                    <button onClick={() => onLike(product.productId, org.name)}>
                      {likedProducts &&
                      likedProducts.find(
                        (entry) => product.productId === entry.id
                      )
                        ? "❤️"
                        : "🖤"}
                    </button>
                    <ClickerWrapper className="">
                      <img
                        src="/plus.png"
                        alt="remove one from cart"
                        width="50px"
                        id={product._id}
                        onClick={() =>
                          decrementCounter(product.productId + ";;" + org.name)
                        }
                      ></img>
                      <span id="counter">
                        {productCounter[0]
                          ? productCounter.find(
                              (arrayProduct) =>
                                arrayProduct.id ===
                                product.productId + ";;" + org.name
                            ).count
                          : 0}
                      </span>
                      <img
                        src="/plus.png"
                        alt="add one to cart"
                        width="50px"
                        id={product._id}
                        onClick={() =>
                          incrementCounter(product.productId + ";;" + org.name)
                        }
                      ></img>
                    </ClickerWrapper>
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
                {/* </Link> */}
              </li>
            );
          });
        })}
      </CardWrapper>
    </ExploreSection>
  );
}
