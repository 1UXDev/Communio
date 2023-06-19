import styled from "styled-components";

const LanguageWrapper = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-flow: row wrap;
  width: 200px;
  justify-content: right;
  gap: 12px;
`;

export default function Language() {
  return (
    <LanguageWrapper>
      <button>DE</button> <span>|</span> <button>EN</button>
    </LanguageWrapper>
  );
}
