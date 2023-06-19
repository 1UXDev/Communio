import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";

const NavContainer = styled.div`
  position: fixed;
  bottom: 0px;
  width: 100%;
  max-width: 660px;
  background: gray;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  & * {
    display: flex;
    flex-flow: column wrap;
    align-items: center;
  }
`;

export default function Nav() {
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
      <Link href="/profile" alt="Link to your Profile">
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
