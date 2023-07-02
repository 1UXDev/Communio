import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import useStore from "@/pages/globalstores";

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

const Badge = styled.div`
  background-color: rgb(60, 190, 200);
  position: absolute;
  margin-left: 16px;
  color: white;
  padding: 2px;
  width: 16px;
  height: 16px;
  font-size: 0.7em;
  font-weight: bold;
  border-radius: 99px;
  z-index: 99;
`;

export default function Nav() {
  const usersData = useStore((state) => state.usersData);
  const productCounter = useStore((state) => state.productCounter);

  const productAmount = productCounter.reduce(
    (accumulator, product) => accumulator + product.count,
    0
  );

  // ---- An approach with useEffect ... are there big advantages here?
  // const [productAmount, setProductAmount] = useState(null);

  // useEffect(() => {
  //   setProductAmount(
  //     productCounter.reduce(
  //       (accumulator, product) => accumulator + product.count,
  //       0
  //     )
  //   );
  // }, []);

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
        {!productAmount < 1 && <Badge>{productAmount}</Badge>}
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
