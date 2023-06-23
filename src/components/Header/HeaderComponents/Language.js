import styled from "styled-components";

const LanguageWrapper = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-flow: row wrap;
  width: 200px;
  justify-content: right;
  gap: 12px;
  & * {
    border: none;
    background-color: transparent;
    font-weight: bold;
  }
`;

export default function Language({ currentUser }) {
  return (
    <LanguageWrapper>
      <button>DE</button> <span>|</span> <button>EN</button>
    </LanguageWrapper>
  );
}
