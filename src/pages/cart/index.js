import Layout from "@/components/Layout/Layout";
import useStore from "../globalstores";
import useSWR from "swr";
import React, { useEffect, useState } from "react";
import { uid } from "uid";
import { StyledButton } from "@/components/StyledButton/StyledButton";
import Counter from "@/components/Counter/Counter";

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

  useEffect(() => {
    let interimStorage = [];

    globalProductCounter.forEach((selectedProduct) => {
      const selectedProductId = selectedProduct.id.split(";;")[0];
      const selectedProductOrg = selectedProduct.id.split(";;")[1];

      const product = allProducts.find(
        (product) => product._id === selectedProductId
      );

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
  }, [globalProductCounter, allProducts]);

  return (
    <Layout>
      <section className="FavoritesWrapper">
        <h1>Here will be the Cart</h1>
        <article>
          <ul>
            {console.log(combinedData)}
            {combinedData.length === 0 ? (
              <h2>Your cart is currently empty</h2>
            ) : (
              combinedData.map(
                ({ selectedProduct, product, selectedProductOrg }) =>
                  selectedProduct.count > 0 && (
                    <li key={uid()}>
                      <img src={product.productImage} width="100"></img>
                      <h4>
                        {selectedProduct.count}x {product.name}{" "}
                        {product.weightSize}
                        {product.unit}
                      </h4>
                      <p>{selectedProductOrg}</p>
                      <span></span>
                      <p>{product.pricePerPieceEuro}€</p>
                      <div style={{ backgroundColor: "#000" }}>
                        <Counter
                          product={selectedProduct}
                          org={selectedProductOrg}
                        ></Counter>
                      </div>
                    </li>
                  )
              )
            )}
          </ul>
        </article>
        <article>
          <br></br>
          <div>
            <h2>Sum</h2>
            {amountToPay}€
          </div>
        </article>
      </section>
      <StyledButton className="inverse">Checkout</StyledButton>
    </Layout>
  );
}
