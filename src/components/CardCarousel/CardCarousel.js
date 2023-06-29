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
import { useSession } from "next-auth/react";

const ExploreSection = styled.section``;

export default function CardCarousel() {
  const { data: session } = useSession();

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

  // ____ Stuff for the counters ____

  // initiales laden der currentOrganizations
  useEffect(() => {
    if (!usersData.productCounter || usersData.productCounter.length === 0) {
      if (productCounter.length === 0) {
        let newProductCounter = currentOrganizations.flatMap((org) =>
          org.products.map((product) => ({
            id: product.productId + ";;" + org.name,
            org: org.name,
            count: 0,
          }))
        );
        setProductCounter(newProductCounter);
      }
    } else {
      setProductCounter(usersData.productCounter);
    }
  }, [currentOrganizations]);

  useEffect(() => {
    console.log(productCounter);
    async function updateCountsOnServer() {
      console.log("test");
      try {
        const method = "PATCH";

        console.log("serverfunct", productCounter);
        const response = await fetch(`/api/users/${session?.user._id}`, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productCounter }),
        });

        if (response.ok) {
          console.log("yay :)");
        }
      } catch (error) {
        console.error(error);
      }
    }
    productCounter.length > 0 && updateCountsOnServer();
  }, [productCounter]);

  // note: the clickedId is a combination of a static product-identifier(productId) + ; + the name of the organization, since multiple orgs can have the same product-need and we need to be able to split it again (thus the ";;")
  function incrementCounter(clickedId) {
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
