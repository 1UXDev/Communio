import styled from "styled-components";
import useStore from "../globalstores";
import { useSession } from "next-auth/react";
import { uid } from "uid";
import { useEffect } from "react";
import { StyledButton } from "@/components/StyledButton/StyledButton";
import { useRouter } from "next/router";
import useSWRMutation from "swr/mutation";

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

const Select = styled.select`
  width: 80%;
  max-width: 250px;
`;

export default function Hello() {
  const { data: session } = useSession();
  const bezirk = useStore((state) => state.bezirk);
  const setBezirk = useStore((state) => state.setBezirk);
  const router = useRouter();

  const hardCodedBezirke = [
    "Charlottenburg",
    "Friedrichshain",
    "Köpenick",
    "Kreuzberg",
    "Lichtenberg",
    "Mariendorf",
    "Mitte",
    "Moabit",
    "Neukölln",
    "Pankow",
    "Prenzlauer Berg",
    "Schöneberg",
    "Steglitz",
    "Tempelhof",
    "Tiergarten",
    "Treptow",
    "Wedding",
    "Weißensee",
    "Wilmersdorf",
    "Zehlendorf",
  ];

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    await trigger(data);
    router.push("/");
  }

  // destructure SWR Mutation into trigger for function above
  const { trigger, isMutating } = useSWRMutation(
    `/api/users/${session?.user._id}`,
    sendRequest
  );

  // define content to give to API route as wrapperfunction for fetch
  async function sendRequest(url, { arg }) {
    const response = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(arg),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // check response
    if (response.ok) {
      await response.json();
      // mutate(); // Change the data to the update
    } else {
      console.error(`Error: ${response.status}`);
    }
  }

  function bezirkChange(event) {
    setBezirk(event.target.value);
  }

  return (
    <HelloWrapper>
      <img src={session?.user.image}></img>
      <h1>Hi {session?.user.name} 👋</h1>
      <h2>Welcome to Communio</h2>
      <p>
        Communio is the platform to support charity in your local area. To
        connect you with the charity organizations, we need to know your
        approximate location.
      </p>
      <form onSubmit={handleSubmit}>
        <Select
          onChange={bezirkChange}
          value={bezirk}
          name="bezirk"
          id="bezirk"
        >
          {hardCodedBezirke.map((hardCodedBezirk) => {
            return (
              <option value={hardCodedBezirk} key={uid()}>
                {hardCodedBezirk}
              </option>
            );
          })}
        </Select>
        <StyledButton disabled={!bezirk} type="submit">
          Let's go!
        </StyledButton>
        <span id="hinttext" style={{ display: "none" }}>
          Please select a location from the dropdown first
        </span>
      </form>
    </HelloWrapper>
  );
}
