import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import useStore from "@/db/globalstore";
import { useRouter } from "next/router";
import useSWR from "swr";

// Icons
import Explore from "public/Explore.svg";
import Favorite from "public/Favorite.svg";
import Cart from "public/Cart.svg";
import Profile from "public/Profile.svg";
import Explore_Active from "public/Explore_Active.svg";
import Favorite_Active from "public/Favorite_Active.svg";
import Cart_Active from "public/Cart_Active.svg";
import Profile_Active from "public/Profile_Active.svg";
import { useEffect, useState } from "react";

const NavContainer = styled.div`
  position: fixed;
  bottom: -5px;
  width: 100%;
  max-width: 660px;
  background: white;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  padding: 16px 0px;
  box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.12);
  font-size: 0.75em;
  & * {
    display: flex;
    flex-flow: column wrap;
    gap: 6px;
    align-items: center;
  }
`;

const Badge = styled.div`
  background-color: rgb(50, 160, 240);
  border: 1px solid white;
  position: absolute;
  margin-left: 18px;
  color: white;
  padding: 2px;
  width: 18px;
  height: 18px;
  font-size: 0.8em;
  font-weight: bold;
  border-radius: 99px;
  z-index: 99;
`;

export default function Nav({ currentUser }) {
  const globalProductCounter = useStore((state) => state.globalProductCounter);

  const [productAmount, setProductAmount] = useState();

  useEffect(() => {
    setProductAmount(
      globalProductCounter.reduce(
        (accumulator, product) => accumulator + product.count,
        0
      )
    );
  }, [globalProductCounter]);

  const router = useRouter();
  const currentSite = router.pathname;

  return (
    <NavContainer>
      <Link href="/" alt="Link to Home">
        <Image
          src={currentSite === "/" ? Explore_Active : Explore}
          width="30"
          height="30"
          alt="Icon Home"
        ></Image>
        <span>Explore</span>
      </Link>
      <Link href="/favorites" alt="Link to Favorites">
        <Image
          src={currentSite === "/favorites" ? Favorite_Active : Favorite}
          width="30"
          height="30"
          alt="Icon Favorites"
        ></Image>
        <span>Favorites</span>
      </Link>
      <Link href="/cart" alt="Link to Cart">
        <Image
          src={currentSite === "/cart" ? Cart_Active : Cart}
          width="30"
          height="30"
          alt="Icon Cart"
        ></Image>
        <span>Cart</span>
        {productAmount !== "Loading" && productAmount > 0 && (
          <Badge>{productAmount}</Badge>
        )}
      </Link>
      {/* <Link href="/search" alt="Link to Search">
        <Image
          src="https://static.thenounproject.com/png/780226-200.png"
          width="30"
          height="30"
          alt="Icon Search"
        ></Image>
        <span>Search</span>
      </Link> */}
      <Link href={`/profile/user`} alt="Link to your Profile">
        <Image
          src={currentSite.includes("/profile/") ? Profile_Active : Profile}
          width="30"
          height="30"
          alt="Icon Profile"
        ></Image>
        <span>Profile</span>
      </Link>
    </NavContainer>
  );
}
