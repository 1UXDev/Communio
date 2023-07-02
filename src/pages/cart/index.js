import Layout from "@/components/Layout/Layout";
import useStore from "../globalstores";
import useSWR from "swr";
import React, { useEffect, useState } from "react";
import { uid } from "uid";
import { StyledButton } from "@/components/StyledButton/StyledButton";

export default function Cart() {
  // Product Counters
  const productCounter = useStore((state) => state.productCounter);
  const setProductCounter = useStore((state) => state.setProductCounter) || [];

  // User and Org Data
  const allOrganizations = useStore((state) => state.allOrganizations);
  const setAllOrganizations = useStore((state) => state.setAllOrganizations);
  const usersData = useStore((state) => state.usersData);

  // What is to be payed
  const setAmountToPay = useStore((state) => state.setAmountToPay);
  const amountToPay = useStore((state) => state.amountToPay);
  let sum = 0;

  useEffect(() => {
    setAmountToPay(sum.toFixed(2));
    console.log("triggered");
  }, [sum]);

  const { data, error, isLoading } = useSWR("/api/cart");
  useEffect(() => {
    setAllOrganizations(data);
    setProductCounter(usersData.productCounter);
  }, [data]);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  if (!productCounter || productCounter.length === 0) {
    return "Loading ...";
  }

  return (
    <Layout>
      <section className="FavoritesWrapper">
        <h1>Here will be the Cart</h1>
        <article>
          <ul>
            {
              // Check if something was put into productCounter already
              productCounter.reduce(
                (sum, oneProduct) => sum + oneProduct.counter,
                0
              ) === 0 ? (
                <h2>your cart is currently empty</h2>
              ) : (
                // if yes: map it!
                productCounter.map((selectedProduct) => {
                  //let selectedProductData = selectedProduct.id.split(";;"); //returns Array ["12345678abc", "Tafel xyz"]
                  let selectedProductId = selectedProduct.id.split(";;")[0];
                  let selectedProductOrg = selectedProduct.id.split(";;")[1];

                  // only map the things that were added to the cart
                  return (
                    selectedProduct.count !== 0 &&
                    data.map((org) => {
                      if (org.name === selectedProductOrg) {
                        return org.products.map((product) => {
                          if (product.productId === selectedProductId) {
                            sum =
                              sum +
                              selectedProduct.count * product.pricePerPieceEuro;
                            return (
                              <li key={uid()}>
                                <h4>
                                  {selectedProduct.count}x {product.name}{" "}
                                  {product.weightSize}
                                  {product.unit}
                                </h4>
                                <p>{selectedProductOrg}</p>
                                <span></span>
                                <p>{product.pricePerPieceEuro}€</p>
                              </li>
                            );
                          }
                          return null; // fallback if condition is not met
                        });
                      }
                      return null; // fallback if condition is not met
                    })
                  );
                })
              )
            }
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
