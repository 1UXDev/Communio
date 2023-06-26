import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import useStore from "@/pages/globalstore";

const NavContainer = styled.div`
  position: fixed;
  bottom: 0px;
  width: 100%;
  max-width: 660px;
  background: white;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  padding: 16px 0px;
  box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.12);
  & * {
    display: flex;
    flex-flow: column wrap;
    gap: 6px;
    align-items: center;
  }
`;

export default function Nav() {
  const usersData = useStore((state) => state.usersData);
  return (
    <NavContainer>
      <Link href="/" alt="Link to Home">
        <Image
          src="https://static.thenounproject.com/png/780226-200.png"
          width="30"
          height="30"
          alt="Icon Home"
        ></Image>
        <span>Explore</span>
      </Link>
      <Link href="/favorites" alt="Link to Favorites">
        <Image
          src="https://static.thenounproject.com/png/780226-200.png"
          width="30"
          height="30"
          alt="Icon Favorites"
        ></Image>
        <span>Favorites</span>
      </Link>
      <Link href="/cart" alt="Link to Cart">
        <Image
          src="https://static.thenounproject.com/png/780226-200.png"
          width="30"
          height="30"
          alt="Icon Cart"
        ></Image>
        <span>Cart</span>
      </Link>
      <Link href="/search" alt="Link to Search">
        <Image
          src="https://static.thenounproject.com/png/780226-200.png"
          width="30"
          height="30"
          alt="Icon Search"
        ></Image>
        <span>Search</span>
      </Link>
      <Link href={`/profile/${usersData._id}`} alt="Link to your Profile">
        <Image
          src="https://static.thenounproject.com/png/780226-200.png"
          width="30"
          height="30"
          alt="Icon Profile"
        ></Image>
        <span>Profile</span>
      </Link>
    </NavContainer>
  );
}
