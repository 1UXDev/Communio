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
