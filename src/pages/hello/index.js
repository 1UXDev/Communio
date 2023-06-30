import styled from "styled-components";
import { useSession } from "next-auth/react";
import UserLocation from "@/components/Header/HeaderComponents/UserLocation";

const HelloWrapper = styled.section`
  display: flex;
  flex-flow: column;
  gap: 24px;
  align-items: center;
  width: 100%;
  height: 100vh;
  margin: 0px auto;
  color: white;
  background-color: #5c4ad1;
  background: linear-gradient(220deg, #43b4d8 25%, #7343d8 90%);
  background-image: linear-gradient(
    220deg,
    rgb(67, 180, 216) 25%,
    rgb(115, 67, 216) 90%
  );
  padding: 24px;

  & img {
    width: 50%;
    border-radius: 200px;
  }
`;

export default function Hello() {
  const { data: session } = useSession();

  return (
    <HelloWrapper>
      <img src={session?.user.image} alt="your profile picture"></img>
      <h1>Hi {session?.user.name} 👋</h1>
      <h2>Welcome to Communio</h2>
      <p>
        Communio is the platform to support charity in your local area. To
        connect you with the charity organizations, we need to know your
        approximate location.
      </p>
      <UserLocation pushLinkLocation={"/"} includeButton={true}></UserLocation>
    </HelloWrapper>
  );
}
