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
    if (!usersData.productCounter || usersData.productCounter.length === 0) {
      if (productCounter.length === 0) {
        let newProductCounter = organizations.flatMap((org) =>
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
  }, []);

  // --- Wenn productCounter existiert bzw sich ändert > DB
  useEffect(() => {
    async function updateCountsOnServer() {
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
  function incrementCounter(clickedId) {
    const updatedProductCounter = productCounter.map((product) => {
      return product.id === clickedId
        ? { ...product, count: product.count + 1 }
        : product;
    });
    setProductCounter(updatedProductCounter);
    console.log(productCounter);
  }

  function decrementCounter(clickedId) {
    const updatedProductCounter = productCounter.map((product) => {
      return product.id === clickedId && product.count > 0
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
        id={product._id}
        onClick={() => decrementCounter(product.productId + ";;" + org.name)}
      ></img>
      <span id="counter">
        {productCounter[0]
          ? productCounter.find(
              (arrayProduct) =>
                arrayProduct.id === product.productId + ";;" + org.name
            ).count
          : 0}
      </span>
      <img
        src="/plus.png"
        alt="add one to cart"
        width="50px"
        id={product._id}
        onClick={() => incrementCounter(product.productId + ";;" + org.name)}
      ></img>
    </ClickerWrapper>
  );
}
