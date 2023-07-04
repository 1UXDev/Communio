import useStore from "@/pages/globalstores";
import { uid } from "uid";
import { useRouter } from "next/router";
import useSWRMutation from "swr/mutation";
import styled from "styled-components";
import { useSession } from "next-auth/react";
import { useRef } from "react";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Select = styled.select`
  max-width: 250px;
  font-weight: bold;

  border: none;

  &.light {
    background-color: transparent;
    color: white;
    font-size: 1em;
  }
`;

// This component accepts

// - button or not button
// - the initially selected bezirk from the user
// - a text which Bezirk you want to support, for the "hello" onboarding screen
export default function UserLocation({
  includeButton,
  initialBezirk,
  includeSupportText,
}) {
  const bezirk = useStore((state) => state.bezirk);
  const setBezirk = useStore((state) => state.setBezirk);
  const router = useRouter();
  const { data: session } = useSession();
  const formRef = useRef(null);

  const hardCodedBezirke = [
    "Charlottenburg",
    "Friedrichshain",
    "Koepenick",
    "Kreuzberg",
    "Lichtenberg",
    "Mariendorf",
    "Mitte",
    "Moabit",
    "Neukoelln",
    "Pankow",
    "PBerg",
    "Schoeneberg",
    "Steglitz",
    "Tempelhof",
    "Tiergarten",
    "Treptow",
    "Wedding",
    "Weissensee",
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
    } else {
      console.error(`Error: ${response.status}`);
    }
  }

  return (
    <Form onSubmit={handleSubmit} ref={formRef}>
      <div>
        {includeSupportText && <span className="supportText">I support</span>}
        <Select
          onChange={(event) => {
            bezirkChange(event);
            handleSubmit(event);
          }}
          value={!bezirk ? initialBezirk : bezirk}
          name="bezirk"
          id="bezirk"
          className={includeSupportText && "light"}
        >
          {hardCodedBezirke.map((hardCodedBezirk) => {
            return (
              <option value={hardCodedBezirk} key={uid()}>
                {hardCodedBezirk}
              </option>
            );
          })}
        </Select>
      </div>
    </Form>
  );
}
