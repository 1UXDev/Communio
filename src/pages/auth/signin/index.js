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

  text-align: center;
  font-family: var(--font-inter);

  color: white;
  background-color: #5c4ad1;
  background: linear-gradient(266.86deg, #43b4d8 8.28%, #7343d8 91.96%);
  background-image: linear-gradient(
    266.86deg,
    rgb(67, 180, 216) 8.28%,
    rgb(115, 67, 216) 91.96%
  );
  & article {
    padding: 96px 12px;
  }
  & button {
    background-color: white;
    padding: 12px 48px;
    border-radius: 8px;
    border: none;
    font-size: 1.4em;
    margin: 6px;
  }
  h1 {
    font-size: 3.5em;
    padding-bottom: 48px;
  }
  p,
  span {
    font-size: 1.8em;
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
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button onClick={() => signIn(provider.id)}>
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
