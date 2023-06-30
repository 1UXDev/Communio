import styled from "styled-components";
import useStore from "@/pages/globalstores";
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

export default function Counter({ organizations, usersData, product, org }) {
  // Counter
  const productCounter = useStore((state) => state.productCounter) || [];
  const setProductCounter = useStore((state) => state.setProductCounter) || [];

  // --- initiales laden der organizations > check ob Counter-array mit diesen Produkten bereits existiert
  useEffect(() => {
    if (!usersData.productCounter) {
      let newProductCounter = organizations.flatMap((org) =>
        org.products.map((product) => ({
          _id: product._id,
          org: org.name,
          count: 0,
        }))
      );
      setProductCounter(newProductCounter);
    } else {
      setProductCounter(usersData.productCounter);
    }
  }, []);

  // --- Wenn productCounter existiert bzw sich ändert > DB
  useEffect(() => {
    async function updateCountsOnServer() {
      console.log(productCounter);

      try {
        const method = "PATCH";
        const response = await fetch(`/api/users/`, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productCounter }),
        });
        if (response.ok) {
        }
      } catch (error) {
        console.error("we have an error :(", error);
      }
    }
    productCounter.length > 0 && updateCountsOnServer();
  }, [productCounter]);

  // --- Working with the actual click-event
  // note: the clickedId is a combination of a static product-identifier(productId) + ; + the name of the organization, since multiple orgs can have the same product-need and we need to be able to split it again (thus the ";;")
  function incrementCounter(event) {
    const clickedId = event.target.dataset.id;
    const updatedProductCounter = productCounter.map((product) => {
      console.log(product._id, clickedId);
      return product._id === clickedId
        ? { ...product, count: product.count + 1 }
        : product;
    });
    console.log("updated.........", updatedProductCounter);
    setProductCounter(updatedProductCounter);
  }

  function decrementCounter(event) {
    const clickedId = event.target.dataset.id;
    const updatedProductCounter = productCounter.map((product) => {
      return product._id === clickedId && product.count > 0
        ? { ...product, count: product.count - 1 }
        : product;
    });
    setProductCounter(updatedProductCounter);
  }

  return (
    <ClickerWrapper className="">
      <img
        src="/plus.png"
        alt="remove one from cart"
        width="50px"
        data-id={product._id}
        onClick={decrementCounter}
      ></img>
      <span id="counter">
        {productCounter[0]
          ? productCounter.find(
              (arrayProduct) => arrayProduct._id === product._id
            )?.count
          : 0}
      </span>
      <img
        src="/plus.png"
        alt="add one to cart"
        width="50px"
        data-id={product._id}
        onClick={incrementCounter}
      ></img>
    </ClickerWrapper>
  );
}
