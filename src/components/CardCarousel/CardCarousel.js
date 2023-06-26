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
import { useEffect, useState } from "react";

const ExploreSection = styled.section``;
const ClickerWrapper = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  & span {
    color: white;
    font-weight: bold;
  }
`;

export default function CardCarousel() {
  const currentOrganizations =
    useStore((state) => state.currentOrganizations) || [];
  const usersData = useStore((state) => state.usersData);
  const allProducts = useStore((state) => state.allProducts);
  const productCounter = useStore((state) => state.productCounter) || [];
  const setProductCounter = useStore((state) => state.setProductCounter) || [];

  if (!currentOrganizations || currentOrganizations.length < 1) {
    return <div>Loading...</div>;
  }
  if (!usersData || usersData.length < 1) {
    return <div>Loading...</div>;
  }

  // !!!! ________ interim solution until backend-object works _______
  // Store the to-be-combined data in some Variables
  const userOrgsProducts = [];
  const productArray = [];

  // Get the product the organization that is relevant for the user needs
  currentOrganizations.forEach((org) => {
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
    const filteredProducts = allProducts.find(
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

  // // redefine the orgProduct Object with the new dimensions from the product
  // if (filteredProducts) {
  //   // Assign props
  //   orgProduct.name = filteredProducts.name;
  //   orgProduct.pricePerPieceEuro = filteredProducts.pricePerPieceEuro;
  //   orgProduct.description = filteredProducts.description;
  //   orgProduct.productImage = filteredProducts.productImage;
  //   orgProduct.unit = filteredProducts.unit;
  //   orgProduct.weightSize = filteredProducts.weightSize;
  // }

  // The Counter
  // buliding an array of objects with counts and products that is saved only for the session (not written into DB, unless user checks out, than it will show up in purchase history)
  // const countArray =
  // setProductCounter(
  //   currentOrganizations.flatMap((organization) => {
  //     return organization.products.map((product) => {
  //       return { countId: product._id, countValue: 0 };
  //     });
  //   })
  // );
  // console.log("productCoutner:  ", productCounter);

  function incrementCounter() {}
  // function incrementCounter(event) {
  //   setProductCounter((prevProductCounter) => {
  //     prevProductCounter.map((productCount) => {
  //       if (count.countId === event.target.id) {
  //         return { ...productCount, countValue: productCount.countValue + 1 };
  //       }
  //     });
  //   });
  // }

  function decrementCounter(event) {}

  // // increment
  // const incrementCounter = (productId) => {
  //   setCounters((prevCounters) => ({
  //     ...prevCounters,
  //     [productId]: (prevCounters[productId] || 0) + 1,
  //   }));
  //   console.log(counters);
  // };

  // // decrement
  // const decrementCounter = (productId) => {
  //   console.log("product id", productId);
  //   setCounters((prevCounters) => ({
  //     // fill with previous Contents
  //     ...prevCounters,
  //     // if prevCounters -1, otherwise set 0
  //     [productId]: (prevCounters[productId] || 0) - 1,
  //     //{"product id": productId, counterValue:}
  //   }));
  //   console.log(counters);
  // };

  // function addCounter() {
  //   console.log(currentNode.previousElementSibling.value);
  // }

  // function amountCounter(event) {
  // countArray.find(() => productClickedId).countValue += e;
  //console.log(countArray);
  //}

  // function amountCounter(productClicked) {
  //   // if the clicked product already exists in the array holding the clicks, then add "e" (-1 or +1) to the current countervalue
  //   let findCurrentInCounter = counter.find(
  //     (productAlreadyClicked) => productAlreadyClicked.id === productClicked
  //   );

  //   if (findCurrentInCounter) {
  //     findCurrentInCounter.counterValue += 1;
  //     console.log("if", counter);
  //   } else {
  //     setCounter([...counter, { id: productClicked, counterValue: e }]);
  //     console.log("else", counter);
  //   }
  // }

  return (
    <ExploreSection>
      <h2>➡️ Discover All Donations</h2>
      <CardWrapper>
        {console.log(productArray)}
        {productArray.map((product) => {
          return (
            <li key={uid()} className="small">
              {/* <Link href={`/products/${product.productId}`}> */}
              <IMGwrapper>
                <img src={product.productImage} alt={product.name} />
                <IMGoverlay>
                  <ClickerWrapper className="">
                    <img
                      src="/plus.png"
                      alt="remove one from cart"
                      width="50px"
                      id={product._id}
                      onClick={decrementCounter}
                    ></img>
                    <span id="counter">
                      {/* {productCounter.find(
                          (products) => products.countId === product._id
                        )} */}
                    </span>
                    <img
                      src="/plus.png"
                      alt="add one to cart"
                      width="50px"
                      id={product._id}
                      onClick={incrementCounter}
                    ></img>
                  </ClickerWrapper>
                  <h4>{product.organizationName}</h4>
                </IMGoverlay>
              </IMGwrapper>
              <TEXTwrapper>
                {/* <span>{product.pricePerPieceEuro.toFixed(2)}€</span> */}
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
