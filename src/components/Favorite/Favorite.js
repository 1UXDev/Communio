import styled from "styled-components";
import useStore from "@/pages/globalstores";
import { useEffect } from "react";

const FavWrapper = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
`;

export default function Favorite({ product, org, usersData, organizations }) {
  const favorites = useStore((state) => state.favorites) || [];
  const setFavorites = useStore((state) => state.setFavorites) || [];

  // --- initiales laden der organizations > check ob fav-array mit diesen Produkten bereits existiert
  useEffect(() => {
    if (usersData.favorites || usersData.favorites.length !== 0) {
      setFavorites(usersData.favorites);
    } else {
      null;
    }
  }, []);

  // --- Wenn likedProducts existiert bzw sich ändert > DB
  useEffect(() => {
    async function updateFavoritesOnServer() {
      try {
        const method = "PATCH";

        const response = await fetch(`/api/users/`, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ favorites }),
        });

        if (response.ok) {
        }
      } catch (error) {
        console.error(error);
      }
    }
    favorites.length > 0 && updateFavoritesOnServer();
  }, [favorites]);

  if (!favorites || !org || !product) {
    return "loading";
  }

  // --- Working with the actual click-event
  function onLike(id) {
    favorites.find((favorite) => favorite.id === id)
      ? setFavorites(favorites.filter((likedProduct) => likedProduct.id !== id))
      : setFavorites([...favorites, { id: id, org: org.name }]);
  }

  return (
    <FavWrapper>
      <button onClick={() => onLike(product.productId + ";;" + org.name)}>
        {favorites &&
        favorites.find(
          (entry) => product.productId + ";;" + org.name === entry.id
        )
          ? "❤️"
          : "🖤"}
      </button>
    </FavWrapper>
  );
}
