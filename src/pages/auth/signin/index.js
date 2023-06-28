import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import styled from "styled-components";
import TypeIt from "typeit-react";

const AuthWrapper = styled.section`
  width: 100%;
  height: 100vh;
  margin: 0px auto;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding-top: 24px;

  text-align: center;
  font-family: var(--font-inter);

  color: white;
  background-color: #5c4ad1;
  background: linear-gradient(220deg, #43b4d8 25%, #7343d8 90%);
  background-image: linear-gradient(
    220deg,
    rgb(67, 180, 216) 25%,
    rgb(115, 67, 216) 90%
  );
  & article {
    padding: 48px 12px;
  }
  & button {
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
  & button:hover {
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: 3px 3px 12px rgba(0, 0, 0, 0.08);
  }
  & .inverse {
    background-color: rgba(0, 0, 0, 0.4);
    color: white;
  }
  & .inverse:hover {
    background-color: rgba(0, 0, 0, 0.5);
    box-shadow: 3px 3px 12px rgba(0, 0, 0, 0.08);
  }
  h1 {
    font-size: 3.5em;
    padding-bottom: 36px;
  }
  p,
  span {
    font-size: 1.6em;
  }
`;
// animate text later-on? https://tobiasahlin.com/moving-letters/#11
export default function SignIn({ providers }) {
  return (
    <AuthWrapper>
      <article>
        <h1>Communio</h1>
        <p>Donations made</p>
        <TypeIt
          options={{ loop: true }}
          getBeforeInit={(instance) => {
            instance
              .type("Convenient")
              .pause(2500)
              .delete(10)
              .pause(800)
              .type("Local")
              .pause(2500)
              .delete(5)
              .pause(800)
              .type("Impactful")
              .pause(2500);

            // Remember to return it!
            return instance;
          }}
        />
      </article>
      <article>
        <h4>Sign-in to support your Kiez</h4>
        <br></br>
        {Object.values(providers).map((provider, i) => (
          <div key={provider.name}>
            <button
              onClick={() => signIn(provider.id)}
              className={i === 1 ? "inverse" : null}
            >
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </article>
    </AuthWrapper>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}
