import Layout from "@/components/Layout/Layout";
import useStore from "../globalstores";
import CardCarousel from "@/components/CardCarousel/CardCarousel";
import {
  CardWrapper,
  IMGwrapper,
  TEXTwrapper,
  IMGoverlay,
} from "@/components/CardBase/styledCardBase";
import { uid } from "uid";

export default function Favorites() {
  const likedProducts = useStore((state) => state.likedProducts) || [];
  const setLikedProducts = useStore((state) => state.setLikedProducts) || [];

  // -----------------
  // Note: for this whole thing to properly work I have to refactor and put the whole clicker code & logic into its own contained component to be reused here
  // ----------------

  return (
    <Layout>
      <div className="FavoritesWrapper">
        <h1>Here will be the Favorites</h1>

        <h3>Favorite Organization</h3>

        <h3>Favorite Donations</h3>
        {console.log(likedProducts)}
        <ul>
          {likedProducts.map((product) => {
            return (
              <li key={uid()}>
                {product.id} - {product.org}
              </li>
            );
          })}
        </ul>
      </div>
    </Layout>
  );
}
