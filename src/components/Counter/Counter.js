import styled from "styled-components";
import useStore from "@/db/globalstore";
import useSWR from "swr";
import { useEffect, useState } from "react";

const ClickerWrapper = styled.div`
  display: flex;
  flex-flow: row;
  gap: 6px;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  transition: all 0.5s ease;
  & span {
    color: grey;
    font-weight: bold;
    background: white;
    padding: 4px 24px;
    font-size: 0.8em;
    border-radius: 12px;
    text-align: center;
    flex: 3;
  }
  & img {
    backdrop-filter: blur(12px);
    width: 30px;
    height: 30px;
    cursor: pointer;
    border-radius: 100%;
  }
  & * {
    box-shadow: 3px 3px 12px rgba(0, 0, 0, 0.75);
  }

  &:not(.expanded) img:first-child,
  &:not(.expanded) span {
    display: none;
  }
`;

export default function Counter({ product, org }) {
  const [expanded, setExpanded] = useState(false);
  const setGlobalProductCounter =
    useStore((state) => state.setGlobalProductCounter) || [];

  const { data, isLoading, error, mutate } = useSWR(`/api/users/`);

  useEffect(() => {
    if (data) {
      // Set the global product counter to the retrieved data on page load
      setGlobalProductCounter(data.productCounter);
    }
  }, [data]);

  if (isLoading) {
    return "Loading";
  }
  const productCounter = data.productCounter;

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

  // --- Working with the actual click-event
  function incrementCounter() {
    const updatedProductCounter = productCounter.map((item) => {
      if (item.id === product.productId + ";;" + org.name) {
        return { ...item, count: item.count + 1 };
      } else {
        return item;
      }
    });

    // Check if new product needs to be added
    const isNewProduct = !updatedProductCounter.some(
      (item) => item.id === product.productId + ";;" + org.name
    );

    if (isNewProduct) {
      updatedProductCounter.push({
        id: product.productId + ";;" + org.name,
        org: org.name,
        bezirk: org.bezirk,
        count: 1,
      });
    }

    // Optimistic update
    mutate({ productCounter: updatedProductCounter }, false);

    sendRequest("/api/users", { productCounter: updatedProductCounter });

    setExpanded(true);
    //console.log(updatedProductCounter);
  }

  function decrementCounter() {
    const updatedProductCounter = productCounter.map((item) => {
      if (item.id === `${product.productId};;${org.name}` && item.count > 0) {
        return { ...item, count: item.count - 1 };
      }
      return item;
    });
    // Optimistic update
    mutate({ productCounter: updatedProductCounter }, false);

    sendRequest("/api/users", { productCounter: updatedProductCounter });
  }

  function thisProductCount() {
    return productCounter.length > 0
      ? productCounter.find(
          (arrayProduct) =>
            arrayProduct.id === product.productId + ";;" + org.name
        )?.count
        ? productCounter.find(
            (arrayProduct) =>
              arrayProduct.id === product.productId + ";;" + org.name
          )?.count
        : 0
      : 0;
  }

  return (
    <ClickerWrapper
      className={`clicker-wrapper${thisProductCount() ? " expanded" : ""}`}
    >
      <img
        src="/minus.svg"
        alt="remove one from cart"
        id={product._id}
        onClick={decrementCounter}
      ></img>
      <span id="counter">{thisProductCount()}</span>
      <img
        src="/plus.svg"
        alt="add one to cart"
        id={product._id}
        onClick={incrementCounter}
      ></img>
    </ClickerWrapper>
  );
}
