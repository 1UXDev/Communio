import styled from "styled-components";
import useStore from "@/pages/globalstores";
import { useEffect } from "react";
import useSWR from "swr";

const FavWrapper = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;

  button {
    background: white;
    border-radius: 8px;
    border: none;
    width: 25px;
    height: 25px;
  }
`;

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Favorite({ product, org }) {
  const favorites = useStore((state) => state.favorites) || [];
  const setFavorites = useStore((state) => state.setFavorites) || [];

  const { data: usersData, mutate } = useSWR("/api/users", fetcher);

  useEffect(() => {
    if (usersData && usersData.favorites && usersData.favorites.length !== 0) {
      setFavorites(usersData.favorites);
    }
  }, [usersData]);

  useEffect(() => {
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
          // Favorites updated successfully
        } else {
          console.error(`Error: ${response.status}`);
        }
      } catch (error) {
        console.error(error);
      }
    }

    favorites.length > 0 && updateFavoritesOnServer();
  }, [favorites]);

  if (!favorites || !org || !product) {
    return "Loading";
  }

  function onLike(id) {
    favorites.find((favorite) => favorite.id === id)
      ? setFavorites(favorites.filter((likedProduct) => likedProduct.id !== id))
      : setFavorites([...favorites, { id: id, org: org.name }]);
    console.log(favorites);
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
