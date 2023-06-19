import styled from "styled-components";

const FilterWrapper = styled.div`
  display: flex;
  flex-flow: row;
  gap: 12px;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  padding: 6px 0px;

  & button {
    flex: 0 0 30%;
    padding: 2px 24px;
    border-radius: 12px;
    box-shadow: 3px 3px 8px rgba(0, 0, 0, 12%);
    scroll-snap-align: start;
    transition: all 0.3s;
  }
`;

export default function Filter() {
  return (
    <FilterWrapper>
      <button>Tafel Weißensee</button>
      <button>Obdachlosenhilfe</button>
      <button>Tierheim Berlin</button>
      <button>Tafel Heinersdorf</button>
      <button>Frauenhaus Kreuzberg</button>
      <button>Caritas Mitte</button>
    </FilterWrapper>
  );
}
