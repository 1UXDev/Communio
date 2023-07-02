import Layout from "@/components/Layout/Layout";
import useStore from "../globalstores";
import useSWR from "swr";
import React, { useEffect } from "react";
import { uid } from "uid";
import { StyledButton } from "@/components/StyledButton/StyledButton";

export default function Cart() {
  const setGlobalProductCounter =
    useStore((state) => state.setGlobalProductCounter) || [];

  const { data, isLoading } = useSWR(`/api/`);

  const setAmountToPay = useStore((state) => state.setAmountToPay);
  const amountToPay = useStore((state) => state.amountToPay);
  let sum = 0;
  let combinedData = [];

  useEffect(() => {
    if (data) {
      let productCounter = data[0].productCounter;
      let allOrganizations = data[1];

      productCounter.forEach((selectedProduct) => {
        const selectedProductId = selectedProduct.id.split(";;")[0];
        const selectedProductOrg = selectedProduct.id.split(";;")[1];

        allOrganizations.forEach((org) => {
          if (org.name === selectedProductOrg) {
            org.products.forEach((product) => {
              if (product.productId === selectedProductId) {
                combinedData.push({
                  selectedProduct,
                  product,
                  selectedProductOrg,
                });
              }
            });
          }
        });
      });

      combinedData.forEach(({ selectedProduct, product }) => {
        sum += product.pricePerPieceEuro * selectedProduct.count;
      });
    }
  }, [data]);

  useEffect(() => {
    setAmountToPay(sum.toFixed(2));
  }, [sum]);

  if (isLoading) {
    return "Loading";
  }

  return (
    <Layout>
      <section className="FavoritesWrapper">
        <h1>Here will be the Cart</h1>
        <article>
          <ul>
            {combinedData.reduce(
              (sum, oneProduct) => sum + oneProduct.selectedProduct.count,
              0
            ) === 0 ? (
              <h2>your cart is currently empty</h2>
            ) : (
              combinedData.map(
                ({ selectedProduct, product, selectedProductOrg }) =>
                  selectedProduct.count > 0 && (
                    <li key={uid()}>
                      <h4>
                        {selectedProduct.selectedProduct.count}x {product.name}{" "}
                        {product.weightSize}
                        {product.unit}
                      </h4>
                      <p>{selectedProductOrg}</p>
                      <span></span>
                      <p>{product.pricePerPieceEuro}€</p>
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
            {sum.toFixed(2)}€
          </div>
        </article>
      </section>
      <StyledButton className="inverse">Checkout</StyledButton>
    </Layout>
  );
}
