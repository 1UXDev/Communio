import styled from "styled-components";

export const CardWrapper = styled.ul`
  display: flex;
  flex-flow: row;
  margin-right: -12px;
  list-style-type: none;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  gap: 12px;

  & li {
    background: white;
  }
  & li.small {
    flex: 0 0 38%;
    max-width: 160px;
  }
  & li.large {
    flex: 0 0 84%;
    max-width: 300px;
  }
  & span {
    color: grey;
  }
`;

export const IMGwrapper = styled.div`
  position: relative;
  height: 160px;
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 12px;
  }
`;

export const TEXTwrapper = styled.div`
  padding: 6px;
`;

export const IMGoverlay = styled.div`
  background-color: blue;
  background: linear-gradient(
    0deg,
    rgba(0, 20, 50, 1),
    rgba(0, 20, 50, 0) 100%
  );
  position: absolute;
  bottom: 0px;
  display: flex;
  flex-flow: row;
  align-items: flex-end;
  justify-content: space-between;
  padding: 8px;
  border-radius: 12px;
  color: white;

  & img {
    width: 20%;
    height: 20%;
  }
  & h4 {
    align-self: center;
    text-align: right;
    width: 70%;
    font-size: 0.8em;
  }
  &.hero {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const ClickerWrapper = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  & span {
    color: white;
    font-weight: bold;
  }
`;
