import Layout from "@/components/Layout/Layout";
import useStore from "../../db/globalstore";
import useSWR from "swr";
import React, { useEffect, useState } from "react";
import { uid } from "uid";
import styled from "styled-components";
import Link from "next/link";
import {
  CardWrapper,
  IMGwrapper,
  TEXTwrapper,
  IMGoverlay,
} from "@/components/CardBase/styledCardBase";
import Counter from "@/components/Counter/Counter";
import Favorite from "@/components/Favorite/Favorite";
import LoaderLight from "@/components/Loader/LoaderLight";

const StyledList = styled.ul`
  list-style-type: none;
  display: flex;
  gap: 12px;
  flex-flow: row wrap;
  padding: 0;
  margin: 0px auto;
  justify-content: start;
  a {
    text-decoration: underline;
  }
  a:hover {
    color: rgb(50, 160, 240);
  }
  & li {
    width: 48%;
  }
`;

const EmptyCart = styled.div`
  margin: 48px;
  padding-top: 48px;
  text-align: center;
  align-self: center;

  h1 {
    font-size: 1.2em;
    font-weight: bold;
  }

  & * {
    margin-bottom: 12px;
  }
`;

const CounterWrapper = styled.div`
  position: absolute;
  top: 4px;
  width: 100%;
  padding: 8px;
`;

export default function Favorites() {
  // The whole solution of using swr + custom code again instead of a component is not ideal
  // this is just for the MVP, the iteration will have a more elegant solution ;)
  const {
    data: allOrganizations,
    isLoading,
    error,
    mutate,
  } = useSWR(`/api/organizations`, { refreshInterval: 10000 });

  const {
    data: userFavorites,
    idLoading: userFavoritesIsLoading,
    error: userFavoritesError,
  } = useSWR(`/api/users/favorites`, { refreshInterval: 10000 });

  const usersData = useStore((state) => state.usersData) || [];

  const favorites = useStore((state) => state.favorites) || [];
  const setFavorites = useStore((state) => state.setFavorites) || [];
  useEffect(() => {
    if (favorites.length === 0 && userFavorites?.length !== 0) {
      setFavorites(userFavorites);
    }
  }, [favorites, setFavorites, userFavorites]);

  if (isLoading || userFavoritesIsLoading) {
    return <LoaderLight></LoaderLight>;
  }

  if (error || userFavoritesError) {
    console.log(error || userFavoritesError);
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
              <>
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
                            <CounterWrapper>
                              <Counter
                                product={product}
                                org={currentOrganizations}
                              ></Counter>
                            </CounterWrapper>
                            <IMGoverlay>
                              {/* <Counter
                                organizations={currentOrganizations}
                                usersData={usersData}
                                product={product}
                                org={currentOrganizations}
                              ></Counter> */}
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
              </>
            )}
          </StyledList>
        </article>
      </section>
    </Layout>
  );
}
