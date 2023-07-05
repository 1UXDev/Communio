import styled from "styled-components";
import useStore from "@/db/globalstore";
import { useState } from "react";
import useSWR, { mutate } from "swr";

const FavWrapper = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
`;

export default function Favorite({ product, org }) {
  const setFavorites = useStore((state) => state.setFavorites) || [];
  const favoritesOnServer = useSWR("/api/users/favorites").data || [];
  const [isUpdating, setIsUpdating] = useState(false);

  async function onLike(id) {
    const isLiked = favoritesOnServer.find((favorite) => favorite.id === id);

    // optimistic UI-update
    let updatedFavorites;
    if (isLiked) {
      updatedFavorites = favoritesOnServer.filter(
        (likedProduct) => likedProduct.id !== id
      );
    } else {
      updatedFavorites = [
        ...favoritesOnServer,
        { id: id, org: org.name, bezirk: org.bezirk },
      ];
    }

    setFavorites(updatedFavorites);
    mutate("/api/users/favorites", updatedFavorites, false);

    setIsUpdating(true);

    try {
      await updateFavoritesOnServer(updatedFavorites);

      // Update favoritesOnServer after server request
      mutate("/api/users/favorites", updatedFavorites);
    } catch (error) {
      console.error(error);
      // fallback if fail
      mutate("/api/users/favorites");
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <FavWrapper>
      <button onClick={() => onLike(product.productId + ";;" + org.name)}>
        {favoritesOnServer.find(
          (entry) => entry.id === product.productId + ";;" + org.name
        )
          ? "❤️"
          : "🖤"}
      </button>
    </FavWrapper>
  );
}

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
    throw new Error(`Error updating favorites: ${error.message}`);
  }
}
