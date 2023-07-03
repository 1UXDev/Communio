import styled from "styled-components";
import { useSession } from "next-auth/react";
import UserLocation from "@/components/UserLocation";
import { StyledButton } from "@/components/StyledButton/StyledButton";
import useStore from "@/pages/globalstores";
import { useRouter } from "next/router";
import Loader from "@/components/Loader/Loader";

const HelloWrapper = styled.section`
  display: flex;
  flex-flow: column;
  gap: 24px;
  align-items: center;
  justify-content: space-between;
  text-align: center;
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

  & article.helloUser {
    padding: 24px;
    flex-grow: 3;
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    justify-content: center;
    gap: 12px;
    max-width: 420px;
  }
  & h1 {
    font-size: 2em;
    padding-bottom: 24px;
  }
  & img {
    max-width: 200px;
    border-radius: 200px;
  }

  & .selectionWrapper {
    flex-grow: 2;
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    justify-content: center;
  }
`;

export default function Hello() {
  const bezirk = useStore((state) => state.bezirk);
  const { data: session } = useSession();
  const router = useRouter();

  function handleButtonClick() {
    console.log("I was clicked");
  }

  return (
    <HelloWrapper>
      <article className="helloUser">
        <img src={session?.user.image} alt="your profile picture"></img>
        <h1>Hi {session?.user.name} 👋</h1>

        <h3>Welcome to Communio</h3>
        <p>
          Communio is the platform to support charity in your local area. To
          start sharing, select your current location.
        </p>
      </article>

      <div className="selectionWrapper">
        <UserLocation
          includeButton={true}
          includeSupportText={true}
        ></UserLocation>
        <>
          <StyledButton
            disabled={!bezirk}
            type="submit"
            onClick={handleButtonClick}
          >
            Let&apos;s go!
          </StyledButton>
          <span id="hinttext" style={{ display: "none" }}>
            Please select a location from the dropdown first
          </span>{" "}
        </>
      </div>
    </HelloWrapper>
  );
}
