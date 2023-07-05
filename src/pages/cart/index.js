import Layout from "@/components/Layout/Layout";
import useStore from "../../db/globalstore";
import useSWR from "swr";
import React, { useEffect, useState } from "react";
import { uid } from "uid";
import styled from "styled-components";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const StyledList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const StyledListItem = styled.li`
  display: flex;
  flex-direction: row wrap;
  justify-content: space-between;
  align-items: center;

  gap: 16px;
  padding: 12px 0px;
  border-bottom: 1px solid #e5e5e5;
`;

const StyledListItemInfos = styled.div`
  display: flex;
  flex-flow: row wrap;
  flex-grow: 3;
  gap: 4px;

  img {
    width: 75px;
    height: 75px;
    border-radius: 8px;
    object-fit: cover;
    margin-right: 8px;
  }
`;

const StyledListItemTexts = styled.div`
  display: flex;
  flex-flow: column;
  padding: 6px 0px;

  justify-content: space-between;

  h4 {
    font-size: 1.2em;
    font-weight: bold;
  }

  p,
  span {
    margin: 0;
    font-size: 0.8em;
  }
`;

const StyledListItemInteractions = styled.div`
  display: flex;
  flex-flow: row-wrap;
  align-items: center;
  gap: 4px;
  color: white;
  font-weight: bold;
  border-radius: 99px;
  padding: 4px;
  background-color: rgb(50, 160, 240);
`;

const FloatyCheckOut = styled.div`
  position: fixed;
  bottom: 100px;
  margin: 0% 5%;
  width: 90%;
  max-width: 540px;
  background: rgba(50, 160, 240, 0.7);
  backdrop-filter: blur(8px);
  color: white;
  border-radius: 12px;
  box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.12);

  display: flex;
  flex-flow: row wrap;
  gap: 24px;
  align-items: center;
  padding: 8px 12px;

  img {
    width: 36px;
  }

  & .amountToPay {
    justify-self: end;
    font-size: 1.2em;
    font-weight: bold;
  }

  &.invisible {
    display: none;
  }
`;

const EmptyCart = styled.div`
  margin: 48px;
  padding-top: 48px;
  text-align: center;

  h1 {
    font-size: 1.2em;
    font-weight: bold;
  }

  & * {
    margin-bottom: 12px;
  }
`;

export default function Cart() {
  const setGlobalProductCounter =
    useStore((state) => state.setGlobalProductCounter) || [];
  const globalProductCounter =
    useStore((state) => state.globalProductCounter) || [];
  const allProducts = useStore((state) => state.allProducts) || [];

  // saving the amount as Zustand to acces it later with stripe
  const setAmountToPay = useStore((state) => state.setAmountToPay);
  const amountToPay = useStore((state) => state.amountToPay);

  // combining the data of productCounter and Products
  const [combinedData, setCombinedData] = useState([]) || [];

  // The whole solution of using swr + custom code again instead of a component is not ideal
  // this is just for the MVP, the iteration will have a more elegant solution ;)
  const { data, isLoading, error, mutate } = useSWR(`/api/users/`);
  const {
    data: ProductData,
    isLoading: ProductDataIsLoading,
    ProductDataError,
  } = useSWR(`/api/products/`);

  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (data) {
      // Set the global product counter to the retrieved data on page load
      setGlobalProductCounter(data.productCounter);
    }
  }, [data]);

  // define content to give to API route as wrapperfunction for fetch
  async function sendRequest(url, data) {
    const response = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      // Data updated successfully?
      const updatedProductCounter = data.productCounter;

      setGlobalProductCounter(updatedProductCounter);
    } else {
      console.error(`Error: ${response.status}`);
    }
  }

  useEffect(() => {
    let interimStorage = [];

    globalProductCounter.forEach((selectedProduct) => {
      const selectedProductId = selectedProduct.id.split(";;")[0];
      const selectedProductOrg = selectedProduct.id.split(";;")[1];

      const product =
        ProductData &&
        ProductData.find((product) => product._id === selectedProductId);

      if (product) {
        const updatedSelectedProduct = {
          ...selectedProduct,
          productId: selectedProduct.id,
        };
        interimStorage.push({
          selectedProduct: updatedSelectedProduct,
          product,
          selectedProductOrg,
        });
      }
    });

    setCombinedData(interimStorage);

    const totalSum = interimStorage.reduce(
      (accumulator, { selectedProduct, product }) =>
        accumulator + product.pricePerPieceEuro * selectedProduct.count,
      0
    );

    setAmountToPay(totalSum.toFixed(2));
  }, [globalProductCounter, ProductData]);

  if (isLoading || ProductDataIsLoading) {
    return "Loading"; //show light spinner here later
  }
  const productCounter = data.productCounter;

  function incrementCounter(clickedId) {
    const updatedProductCounter = productCounter.map((item) => {
      if (item.id === clickedId) {
        return { ...item, count: item.count + 1 };
      } else {
        return item;
      }
    });
    // Optimistic update
    mutate({ productCounter: updatedProductCounter }, false);

    sendRequest("/api/users", { productCounter: updatedProductCounter });
  }
  function decrementCounter(clickedId) {
    const updatedProductCounter = productCounter.map((item) => {
      if (item.id === clickedId && item.count > 0) {
        return { ...item, count: item.count - 1 };
      } else {
        return item;
      }
    });
    // Optimistic update
    mutate({ productCounter: updatedProductCounter }, false);

    sendRequest("/api/users", { productCounter: updatedProductCounter });
  }

  function removeItem(clickedId) {
    const updatedProductCounter = productCounter.map((item) => {
      if (item.id === clickedId) {
        return { ...item, count: (item.count = 0) };
      } else {
        return item;
      }
    });
    // Optimistic update
    mutate({ productCounter: updatedProductCounter }, false);

    sendRequest("/api/users", { productCounter: updatedProductCounter });
  }

  if (status === "authenticated") {
    return (
      <Layout>
        <section className="CartWrapper">
          {/* <h1>What are you sharing today?</h1> */}
          <article>
            <StyledList>
              {combinedData.reduce(
                (accumulator, { selectedProduct, product }) =>
                  accumulator +
                  product.pricePerPieceEuro * selectedProduct.count,
                0
              ) === 0 ? (
                <EmptyCart>
                  <img
                    src="/emptyCart_blue.svg"
                    alt="image of an empty box"
                  ></img>
                  <h1>Your cart is currently empty</h1>
                  <p>Why don&apos;t you add something?</p>
                </EmptyCart>
              ) : (
                combinedData.map(
                  ({ selectedProduct, product, selectedProductOrg }) =>
                    selectedProduct.count > 0 && (
                      <StyledListItem key={uid()}>
                        <StyledListItemInfos>
                          <img
                            src={product.productImage}
                            alt="image of the product"
                          ></img>
                          <StyledListItemTexts>
                            <h4>{product.name}</h4>
                            <p>{selectedProductOrg}</p>
                            <p>
                              {product.pricePerPieceEuro}€ for{" "}
                              {product.weightSize}
                              {product.unit}
                            </p>
                          </StyledListItemTexts>
                        </StyledListItemInfos>
                        <StyledListItemInteractions>
                          <img
                            src="/minus.svg"
                            className="icon"
                            alt="remove one from cart"
                            width="24px"
                            id={product._id}
                            onClick={() =>
                              decrementCounter(selectedProduct.productId)
                            }
                          ></img>
                          <span id="counter">
                            {productCounter.length > 0
                              ? productCounter.find(
                                  (arrayProduct) =>
                                    arrayProduct.id ===
                                    selectedProduct.productId
                                )?.count
                                ? productCounter.find(
                                    (arrayProduct) =>
                                      arrayProduct.id ===
                                      selectedProduct.productId
                                  )?.count
                                : 0
                              : 0}
                          </span>
                          <img
                            src="/plus.svg"
                            className="icon"
                            alt="add one to cart"
                            width="24px"
                            id={product._id}
                            onClick={() =>
                              incrementCounter(selectedProduct.productId)
                            }
                          ></img>
                          {/* <button
                          onClick={() => removeItem(selectedProduct.productId)}
                        >
                          remove
                        </button> */}
                        </StyledListItemInteractions>
                      </StyledListItem>
                    )
                )
              )}
            </StyledList>
          </article>
        </section>
        {combinedData.reduce(
          (accumulator, { selectedProduct, product }) =>
            accumulator + product.pricePerPieceEuro * selectedProduct.count,
          0
        ) !== 0 && (
          <FloatyCheckOut className={!combinedData && "invisible"}>
            <img src="/give_white.svg" alt="icon symbolizing a donation"></img>
            <div className="amountToPay"> Checkout for {amountToPay}€</div>
          </FloatyCheckOut>
        )}
      </Layout>
    );
  } else {
    router.push("/auth/signin");
  }
}
