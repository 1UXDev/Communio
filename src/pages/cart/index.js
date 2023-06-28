import Layout from "@/components/Layout/Layout";
import useStore from "../globalstores";
import useSWR from "swr";
import React, { useEffect, useState } from "react";
import { uid } from "uid";

export default function Cart() {
  const productCounter = useStore((state) => state.productCounter);
  const allOrganizations = useStore((state) => state.allOrganizations);
  const setAllOrganizations = useStore((state) => state.setAllOrganizations);

  // This is just a quick fix, in a later version the "product Counter data" will be saved in Mongo and in the Api route connected to the product data
  let sum = 0;

  const { data, error, isLoading } = useSWR("/api/cart");
  useEffect(() => {
    setAllOrganizations(data);
  }, [data]);
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

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
                  let selectedProductData = selectedProduct.id.split(";;"); //returns Array ["12345678abc", "Tafel xyz"]

                  // only map the things that were added to the cart
                  return (
                    selectedProduct.count !== 0 &&
                    data.map(
                      //map through the individual orgs holding the product data
                      (org) =>
                        org.name === selectedProductData[1] &&
                        org.products.map((product) => {
                          sum +=
                            selectedProduct.count * product.pricePerPieceEuro;
                          return (
                            product.productId === selectedProductData[0] && (
                              <li key={uid()}>
                                <h4>
                                  {selectedProduct.count}x {product.name}{" "}
                                  {product.weightSize}
                                  {product.unit}
                                </h4>
                                <p>{selectedProduct.org}</p>
                                <span></span>
                                <p>{product.pricePerPieceEuro}€</p>
                              </li>
                            )
                          );
                        })
                    )
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
    </Layout>
  );
}
