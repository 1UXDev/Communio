import useStore from "@/pages/globalstores";
import { uid } from "uid";
import { StyledButton } from "@/components/StyledButton/StyledButton";
import { useRouter } from "next/router";
import useSWRMutation from "swr/mutation";
import styled from "styled-components";
import { useSession } from "next-auth/react";
import { useRef } from "react";

const Select = styled.select`
  width: 80%;
  max-width: 250px;
`;

// This component accepts
// - different Links to navigate to after submission
// - button or not button
// - the initially selected bezirk from the user
export default function UserLocation({ includeButton, initialBezirk }) {
  const bezirk = useStore((state) => state.bezirk);
  const setBezirk = useStore((state) => state.setBezirk);
  const router = useRouter();
  const { data: session } = useSession();
  const formRef = useRef(null);

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

  // Since we do not always have a submit button for this component, the selection of an option triggers Submit
  function bezirkChange(event) {
    setBezirk(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData);

    const extendedData = { ...data, isRecurring: true };

    await trigger(extendedData);
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
      console.log("worked");
    } else {
      console.error(`Error: ${response.status}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      <Select
        onChange={(event) => {
          bezirkChange(event);
          handleSubmit(event);
        }}
        value={!bezirk ? initialBezirk : bezirk}
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
      {includeButton && (
        <>
          <StyledButton
            disabled={!bezirk}
            type="button"
            onClick={() => router.push("/")}
          >
            Let&apos;s go!
          </StyledButton>
          <span id="hinttext" style={{ display: "none" }}>
            Please select a location from the dropdown first
          </span>{" "}
        </>
      )}
    </form>
  );
}
