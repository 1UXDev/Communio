import styled from "styled-components";
import useStore from "@/pages/globalstores";
import { useEffect, useRef } from "react";
import useSWR from "swr";

const FavWrapper = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
`;

async function updateFavoritesOnServer(favorites) {
  try {
    const method = "PATCH";
    const response = await fetch("/api/users/favorites", {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ favorites }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
  }
}

export default function Favorite({ product, org }) {
  const favorites = useStore((state) => state.favorites) || [];
  const setFavorites = useStore((state) => state.setFavorites) || [];

  const { mutate } = useSWR("/api/users/favorites");

  const previousFavoritesRef = useRef(favorites);

  useEffect(() => {
    if (favorites !== previousFavoritesRef.current) {
      updateFavoritesOnServer(favorites)
        .then(() => {
          previousFavoritesRef.current = favorites;
        })
        .catch((error) => {
          console.error(error);
          mutate(); // Optional: Trigger a revalidation on error
        });
    }
  }, [favorites, mutate]);

  if (!favorites || !org || !product) {
    return "Loading";
  }

  function onLike(id) {
    const isLiked = favorites.find((favorite) => favorite.id === id);

    if (isLiked) {
      setFavorites(favorites.filter((likedProduct) => likedProduct.id !== id));
    } else {
      setFavorites([
        ...favorites,
        { id: id, org: org.name, bezirk: org.bezirk },
      ]);
    }
  }

  return (
    <FavWrapper>
      <button onClick={() => onLike(product.productId + ";;" + org.name)}>
        {favorites.find(
          (entry) => entry.id === product.productId + ";;" + org.name
        )
          ? "❤️"
          : "🖤"}
      </button>
    </FavWrapper>
  );
}
