import styled from "styled-components";
import useStore from "@/pages/globalstores";
import { useEffect } from "react";

const FavWrapper = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
`;

export default function Favorite({ organizations, usersData, product, org }) {
  const likedProducts = useStore((state) => state.likedProducts) || [];
  const setLikedProducts = useStore((state) => state.setLikedProducts) || [];

  // function onLike(id, org) {
  //   likedProducts.find((product) => product.id === id)
  //     ? setLikedProducts(
  //         likedProducts.filter((likedProduct) => likedProduct.id !== id)
  //       )
  //     : setLikedProducts([...likedProducts, { id: id, org: org }]);
  // }

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
          body: JSON.stringify({ favorites: likedProducts }),
        });

        if (response.ok) {
        }
      } catch (error) {
        console.error(error);
      }
    }
    likedProducts.length > 0 && updateFavoritesOnServer();
  }, [likedProducts]);

  // --- Working with the actual click-event
  function onLike(id) {
    likedProducts.find((alreadyLiked) => alreadyLiked === id)
      ? setLikedProducts(
          likedProducts.filter((alreadyLiked) => alreadyLiked !== id)
        )
      : setLikedProducts([...likedProducts, id]);
  }

  if (!likedProducts) {
    return "loading";
  }

  return (
    <FavWrapper className="">
      <button onClick={() => onLike(product._id)}>
        {likedProducts && likedProducts.find((entry) => product._id === entry)
          ? "❤️"
          : "🖤"}
      </button>
    </FavWrapper>
  );
}
