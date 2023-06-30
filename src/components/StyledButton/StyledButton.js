import styled from "styled-components";

export const StyledButton = styled.button`
    background-color: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(8px);
    padding: 12px 48px;
    border-radius: 8px;
    border: none;
    font-size: 1.2em;
    margin: 6px;
    cursor: pointer;
    transition: 0.25s ease-in;
  }
  & :hover {
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: 3px 3px 12px rgba(0, 0, 0, 0.08);
  }
  &.inverse {
    background-color: rgba(0, 0, 0, 0.4);
    color: white;
  }
  &.inverse:hover {
    background-color: rgba(0, 0, 0, 0.5);
    box-shadow: 3px 3px 12px rgba(0, 0, 0, 0.08);
  }`;
