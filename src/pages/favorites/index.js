import Layout from "@/components/Layout/Layout";
import useStore from "../globalstores";
import useSWR from "swr";
import React, { useEffect, useState } from "react";
import { uid } from "uid";
import styled from "styled-components";
import Link from "next/link";
import CardCarousel from "@/components/CardCarousel/CardCarousel";
import { current } from "immer";
import {
  CardWrapper,
  IMGwrapper,
  TEXTwrapper,
  IMGoverlay,
} from "@/components/CardBase/styledCardBase";
import Counter from "@/components/Counter/Counter";
import Favorite from "@/components/Favorite/Favorite";

const StyledList = styled.ul`
  list-style-type: none;
  display: flex;
  gap: 12px;
  flex-flow: row wrap;
  padding: 0;
  margin: 0;
  a {
    text-decoration: underline;
  }
  a:hover {
    color: rgb(50, 160, 240);
  }
`;

const ListItems = styled.div`
  width: 100%;
  padding: 12px;
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

export default function Favorites() {
  // The whole solution of using swr + custom code again instead of a component is not ideal
  // this is just for the MVP, the iteration will have a more elegant solution ;)
  const {
    data: allOrganizations,
    isLoading,
    error,
    mutate,
  } = useSWR(`/api/organizations`);

  const usersData = useStore((state) => state.usersData) || [];

  const favorites = useStore((state) => state.favorites) || [];
  const setFavorites = useStore((state) => state.setFavorites) || [];

  if (isLoading) {
    return "Loading";
  }

  return (
    <Layout>
      <section className="FavoritesWrapper">
        {/* <h1>These are your Favorites</h1> */}
        <article>
          <StyledList>
            {favorites.length === 0 ? (
              <EmptyCart>
                <img src="/love_blue.svg" alt="image of an empty box" />
                <h1>Your do not have any Favorite Items yet</h1>
                <p>
                  Why don&apos;t you check out the{" "}
                  <Link href="/">Explore Section?</Link> 👀
                </p>
              </EmptyCart>
            ) : (
              <ListItems>
                {favorites.map((favorite) => {
                  let currentOrganizations = allOrganizations.find(
                    (org) => org.name === favorite.org
                  );
                  return currentOrganizations.products.map((product) => {
                    return (
                      product.productId === favorite.id.split(";;")[0] && (
                        <li key={uid()} className="small">
                          <IMGwrapper>
                            <img
                              src={product.productImage}
                              alt={product.name}
                            />
                            <IMGoverlay>
                              <Counter
                                organizations={currentOrganizations}
                                usersData={usersData}
                                product={product}
                                org={currentOrganizations}
                              ></Counter>
                              <div className="textContainer">
                                <h4>{currentOrganizations.name}</h4>
                                <Favorite
                                  product={product}
                                  org={currentOrganizations}
                                  usersData={usersData}
                                  organizations={currentOrganizations}
                                ></Favorite>
                              </div>
                            </IMGoverlay>
                          </IMGwrapper>
                          <TEXTwrapper>
                            <span>{product.pricePerPieceEuro.toFixed(2)}€</span>
                            <h3>
                              {product.name}, {product.weightSize}{" "}
                              {product.unit}
                            </h3>
                            <p>
                              Needed:{" "}
                              {product.amountNeeded - product.amountSold}{" "}
                              {product.unit}
                            </p>
                          </TEXTwrapper>
                        </li>
                      )
                    );
                  });
                })}
              </ListItems>
            )}
          </StyledList>
        </article>
      </section>
    </Layout>
  );
}
