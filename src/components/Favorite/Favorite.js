import styled from "styled-components";
import useStore from "@/pages/globalstores";
import { useEffect } from "react";
import useSWR from "swr";

const FavWrapper = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
`;

export default function Favorite({ product, org }) {
  const favorites = useStore((state) => state.favorites) || [];
  const setFavorites = useStore((state) => state.setFavorites) || [];

  // Anmierkung, die Implementierung mit dieser Funktion erzeugt extrem viel Load, außerdem kann das mit einer schmaleren API Route optimiert werden
  const { data, mutate } = useSWR("/api/users");

  async function updateFavoritesOnServer() {
    try {
      const method = "PATCH";
      const response = await fetch("/api/users", {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ favorites }),
      });

      if (response.ok) {
        // console.log("server has now", favorites);
      } else {
        console.error(`Error: ${response.status}`);
        mutate();
      }
    } catch (error) {
      mutate();
      console.error(error);
    }
  }

  useEffect(() => {
    updateFavoritesOnServer();
  }, [favorites]);

  if (!favorites || !org || !product) {
    return "Loading";
  }

  function onLike(id) {
    const isLiked = favorites.find((favorite) => favorite.id === id);

    if (isLiked) {
      // Remove the liked product
      setFavorites(favorites.filter((likedProduct) => likedProduct.id !== id));
    } else {
      // Add the liked product
      setFavorites([...favorites, { id: id, org: org.name }]);
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
