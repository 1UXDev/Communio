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
  padding: 24px;

  text-align: center;

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
  & .hero {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
  }
  h1 {
    font-size: 4.5em;
    padding-bottom: 36px;
  }
  p,
  span {
    font-size: 1.6em;
  }

  p.small {
    font-size: 1em;
  }
`;

const Hinweis = styled.div`
  background: white;
  color: red;
  padding: 6px;
  font-size: 0.8em;
  font-weight: bold;
  position: fixed;
  z-index: 99;
  top: 12px;
  width: 80%;
  max-width: 600px;
  margin: 0px auto;
  box-shadow: 3px 3px 12px rgba(0, 0, 0, 0.2);
`;

// animate text later-on? https://tobiasahlin.com/moving-letters/#11
export default function SignIn({ providers }) {
  return (
    <AuthWrapper>
      <article className="hero">
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
      <Hinweis>
        Please Note that this Application is currently in Development and will
        be buggy / not respond as you expect. If you still want to test, please
        select &quot;Weißensee&quot; in the welcome-screen as your location,
        since it is the only location with data at the moment.
      </Hinweis>
      <article>
        <p className="small">Sign-in to support your Kiez</p>
        <br></br>
        {Object.values(providers).map((provider, i) => (
          <div key={provider.name}>
            <StyledButton
              onClick={() => signIn(provider.id)}
              className={i === 1 ? "inverse" : null}
            >
              Sign in with {provider.name}
            </StyledButton>
          </div>
        ))}
        <br></br>
        <br></br>
        <p
          className="small"
          onClick={() => {
            setIsUserOrOrganization("organization");
          }}
        >
          {/* <u>Are you an Organization?</u> */}
        </p>
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
