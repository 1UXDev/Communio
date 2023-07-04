import useStore from "@/pages/globalstores";
import { uid } from "uid";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useEffect } from "react";
import Layout from "@/components/Layout/Layout";
import { useSession, signOut } from "next-auth/react";
import styled from "styled-components";

//--- for the data editing // Patching
import useSWRMutation from "swr/mutation";
import EditForm from "@/components/Edit/EditForm";

const ProfileWrapper = styled.section`
display.flex;
flex-direction:column;
justify-content:center;
`;

const ProfileHero = styled.article`
  display: flex;
  flex-flow: row wrap;
  gap: 6px;
  align-items: center;
  justify-content: center;
  margin: 24px 0px 48px 0px;

  & img {
    max-width: 200px;
    border-radius: 100%;
  }
`;

const ProfileHeroText = styled.div`
  display: flex;
  flex-flow: column wrap;
  padding: 24px;

  & h2 {
    font-size: 2.2em;
    margin-bottom: 24px;
  }

  & button {
    padding: 6px 12px;
    border-radius: 20px;
    border: none;
    background: #5c4ad1;
    color: white;
    font-weight: bold;
  }
`;

export default function Profile() {
  //const usersData = useStore((state) => state.usersData) || [];
  const { data: session } = useSession();

  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;

  const { data, isLoading, error, mutate } = useSWR(`../api/users/${id}`, {
    refreshInterval: 0,
  });

  useEffect(() => {
    if (data) {
      data;
    }
  }, [data]);

  //-----------------------------
  // --- Code until if-statements is to edit data of User
  //-----------------------------
  async function onEditFormSubmit(data, event) {
    event.preventDefault();
    await trigger(data);
    //router.push("/");
  }

  // destructure SWR Mutation into trigger for function above
  const { trigger, isMutating } = useSWRMutation(
    `/api/users/${id}`,
    sendRequest
  );

  // define content to give to API route as wrapperfunction for fetch
  async function sendRequest(url, { arg }) {
    const response = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(arg),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // check response
    if (response.ok) {
      await response.json();
      mutate(); // Change the data to the update
    } else {
      console.error(`Error: ${response.status}`);
    }
  }

  if (!data || data._id.length < 1) {
    return <div>Loading...</div>;
  }

  // Loading States
  if (!isReady || isLoading || error) return <h2>Loading...</h2>;
  if (isMutating) {
    return <h1>Submitting your changes...</h1>;
  }

  if (session) {
    return (
      <Layout>
        <ProfileWrapper>
          <ProfileHero>
            <img src={session.user.image} alt="your profile picture" />
            <ProfileHeroText>
              <div>
                <span>This is you! 💁‍♀️ </span>
                <h2>{session.user.name}</h2>
              </div>
              <button onClick={signOut}>Sign out</button>
            </ProfileHeroText>
          </ProfileHero>
          <EditForm
            object={data}
            onEditFormSubmit={onEditFormSubmit}
          ></EditForm>
        </ProfileWrapper>
      </Layout>
    );
  }
}
