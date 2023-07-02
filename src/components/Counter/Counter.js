import styled from "styled-components";
import useStore from "@/pages/globalstores";
import useSWR from "swr";
import { useEffect } from "react";

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

export default function Counter({ product, org }) {
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
      console.log(product.productId, item.id);
      console.log(product);
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
        org: org,
        count: 1,
      });
    }

    // Optimistic update
    mutate({ productCounter: updatedProductCounter }, false);

    sendRequest("/api/users", { productCounter: updatedProductCounter });
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

  return (
    <ClickerWrapper className="">
      <img
        src="/minus.svg"
        alt="remove one from cart"
        width="50px"
        id={product._id}
        onClick={decrementCounter}
      ></img>
      <span id="counter">
        {productCounter.length > 0
          ? productCounter.find(
              (arrayProduct) =>
                arrayProduct.id === product.productId + ";;" + org.name
            )?.count
            ? productCounter.find(
                (arrayProduct) =>
                  arrayProduct.id === product.productId + ";;" + org.name
              )?.count
            : 0
          : 0}
      </span>
      <img
        src="/plus.svg"
        alt="add one to cart"
        width="50px"
        id={product._id}
        onClick={incrementCounter}
      ></img>
    </ClickerWrapper>
  );
}
