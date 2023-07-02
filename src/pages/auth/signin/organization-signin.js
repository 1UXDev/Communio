import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import styled from "styled-components";
import TypeIt from "typeit-react";
import { StyledButton } from "@/components/StyledButton/StyledButton";

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
export default function OrganizationSignIn({ providers }) {
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
        {Object.values(providers).map(
          (provider, i) =>
            provider.type === "credentials" && (
              <div key={provider.name}>
                <StyledButton
                  onClick={() => signIn(provider.id)}
                  className={i === 1 ? "inverse" : null}
                >
                  Sign in with {provider.name}
                </StyledButton>
              </div>
            )
        )}
        <br></br>
        <h6>
          <u>
            <a href="/auth/organization-signin">Are you an Organization?</a>
          </u>
        </h6>
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
