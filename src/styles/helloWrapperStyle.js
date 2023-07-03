import styled from "styled-components";

export const HelloWrapper = styled.section`
  display: flex;
  flex-flow: column;
  gap: 24px;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  width: 100%;
  height: 100vh;
  margin: 0px auto;
  color: white;
  background-color: #5c4ad1;
  background: linear-gradient(220deg, #43b4d8 25%, #7343d8 90%);
  background-image: linear-gradient(
    220deg,
    rgb(67, 180, 216) 25%,
    rgb(115, 67, 216) 90%
  );
  padding: 24px;

  & article.helloUser {
    padding: 24px;
    flex-grow: 3;
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    justify-content: center;
    gap: 12px;
    max-width: 420px;
  }
  & h1 {
    font-size: 2em;
    padding-bottom: 24px;
  }
  & img {
    max-width: 200px;
    border-radius: 200px;
  }

  & .selectionWrapper {
    flex-grow: 2;
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    justify-content: center;
  }
`;
