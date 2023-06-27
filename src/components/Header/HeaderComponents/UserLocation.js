import styled from "styled-components";
import useStore from "../../../pages/globalstore";
import { uid } from "uid";
import { useEffect, useState } from "react";

const LocationWrapper = styled.div`
  display: flex;
  flex: 2 1 auto;
`;

const Select = styled.select`
  width: 80%;
`;

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

export default function UserLocation({ currentUser }) {
  const [selectedBezirk, setSelectedBezirk] = useState(currentUser.bezirk);
  const setCurrentLocation = useStore((state) => state.setCurrentLocation);
  const currentLocation = useStore((state) => state.currentLocation);

  function bezirkChange(event) {
    setSelectedBezirk(event.target.value);
  }

  // useEffect(() => {
  //   setCurrentLocation(selectedBezirk);
  // }, [selectedBezirk]);

  return (
    <LocationWrapper>
      <Select onChange={bezirkChange}>
        {hardCodedBezirke.map((bezirk) => {
          return (
            <option
              value={bezirk}
              key={uid()}
              defaultValue={bezirk === selectedBezirk}
            >
              {bezirk}
            </option>
          );
        })}
      </Select>
    </LocationWrapper>
  );
}
