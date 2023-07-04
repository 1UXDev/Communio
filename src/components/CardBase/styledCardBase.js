import styled from "styled-components";

export const CardWrapper = styled.ul`
  display: flex;
  flex-flow: row;
  margin-right: -12px;
  padding-right: 12px;
  list-style-type: none;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  gap: 12px;

  & li {
    background: white;
  }
  & li.small {
    flex: 0 0 44%;
    max-width: 180px;
  }
  & li.large {
    flex: 0 0 84%;
    max-width: 300px;
  }
`;

export const IMGwrapper = styled.div`
  position: relative;
  height: 200px;
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 12px;
  }
`;

export const TEXTwrapper = styled.div`
  padding: 6px;
  & span {
    color: grey;
  }
  & h3 {
    font-size: 1.1em;
  }
  & p {
    font-size: 0.9em;
  }
`;

export const IMGoverlay = styled.div`
  width: 100%;
  background: linear-gradient(
    0deg,
    rgba(0, 20, 50, 1),
    rgba(0, 20, 50, 0) 100%
  );
  position: absolute;
  bottom: 0px;
  display: flex;
  gap: 4px;
  flex-flow: column;
  align-items: flex-end;
  justify-content: space-between;
  padding: 8px;
  border-radius: 12px;
  color: white;

  & h4 {
    width: 70%;
    font-size: 0.8em;
  }
  &.hero {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
  }
  & .textContainer {
    display: flex;
    flex-flow: row wrap;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }
`;
