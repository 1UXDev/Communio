import Nav from "../Nav/Nav";
import styled from "styled-components";

const Footer = styled.div`
  height: 96px;
`;

export default function Layout({ children }) {
  return (
    <>
      <main>{children}</main>
      <Footer></Footer>
      <Nav></Nav>
    </>
  );
}
