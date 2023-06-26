import Nav from "../Nav/Nav";

export default function Layout({ children }) {
  return (
    <>
      <main>{children}</main>
      <Nav></Nav>
    </>
  );
}
