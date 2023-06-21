import styled from "styled-components";

const FilterWrapper = styled.div`
  display: flex;
  flex-flow: row;
  gap: 12px;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  padding: 6px 0px;
  margin-right: -24px;

  & button {
    flex: 0 0 auto;
    padding: 8px 16px;
    border-radius: 24px;
    border: unset;
    // box-shadow: 2px 2px 6px rgba(0, 0, 0, 12%);
    scroll-snap-align: start;
    transition: all 0.3s;
    background-color: rgb(70, 180, 220);
    color: white;
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
