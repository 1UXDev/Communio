import styled from "styled-components";

const Body = styled.body`
  position: absolute;
  left: 0px;
  max-width: unset;
  width: 100%;
  height: 100%;
  text-align: center;
  padding-top: 24px;
  background-color: #5c4ad1;
  background: linear-gradient(220deg, #43b4d8 25%, #7343d8 90%);
  background-image: linear-gradient(
    220deg,
    rgb(67, 180, 216) 25%,
    rgb(115, 67, 216) 90%
  );
  & iframe {
    background-color: white;
    border-radius: 24px;
    border: none;
    box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.3);
  }
`;

export default function Presentation() {
  return (
    <Body>
      <iframe src="/" height="760px" width="380px" className=""></iframe>
    </Body>
  );
}
