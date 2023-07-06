import useStore from "@/db/globalstore";
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
import LoaderLight from "@/components/Loader/LoaderLight";

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
  padding: 72px 12px 96px 12px;
  margin: -12px -12px 24px -12px;
  background-color: #5c4ad1;
  background: linear-gradient(220deg, #43b4d8 25%, #7343d8 90%);
  background-image: linear-gradient(
    220deg,
    rgb(67, 180, 216) 25%,
    rgb(115, 67, 216) 90%
  );

  & img {
    max-width: 200px;
    border-radius: 100%;
    padding: 12px;
  }
`;

const ProfileHeroText = styled.div`
  display: flex;
  flex-flow: column wrap;
  padding: 24px;
  color: white;

  & h2 {
    font-size: 2.2em;
    margin-bottom: 24px;
  }

  & span {
    font-size: 0.8em;
  }

  & button {
    padding: 6px 12px;
    border-radius: 20px;
    border: 2px solid white;
    background: rgb(70, 180, 220);
    color: white;
    font-weight: bold;
  }
`;

const Form = styled.form`
  background: white;
  border-radius: 25px 25px 0px 0px;
  position: relative;
  margin: -12px;
  top: -50px;
  display: flex;
  flex-flow: column;
  gap: 16px;
  padding: 36px 24px;

  & h2 {
    text-align: center;
    font-size: 1.5em;
    padding-bottom: 24px;
  }

  & button {
    margin-top: 24px;
    padding: 6px 12px;
    border-radius: 20px;
    border: 2px solid white;
    background: rgb(70, 180, 220);
    color: white;
    font-weight: bold;
    width: 180px;
    align-self: center;
  }
`;

const ProfileDBItems = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  font-size: 1em;

  & input {
    border: none;
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

  // if (!data || data._id.length < 1) {
  //   return <div>Loading...</div>;
  // }

  // Loading States
  if (!data || data._id.length < 1 || !isReady || isLoading)
    return <LoaderLight></LoaderLight>;
  if (isMutating) {
    return (
      <LoaderLight loadingItem={"Submitting your changes..."}></LoaderLight>
    );
  }
  if (error) {
    console.log(error);
  }

  // Form

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    onEditFormSubmit(data, event);
  }

  if (session) {
    return (
      <Layout>
        <ProfileWrapper>
          <ProfileHero>
            <img src={session.user.image} alt="your profile picture" />
            <ProfileHeroText>
              <div>
                <span>This is you! </span>
                <h2>{data.name}</h2>
              </div>
              <button onClick={signOut}>Sign out</button>
            </ProfileHeroText>
          </ProfileHero>
          <Form onSubmit={handleSubmit}>
            <h2>Your Data</h2>
            <ProfileDBItems>
              <label>💁‍♀️ Your Name</label>
              <input
                id="name"
                name="name"
                placeholder="your name"
                type={typeof data.name}
                defaultValue={data.name}
                key={uid()}
              />
            </ProfileDBItems>
            <hr></hr>
            <ProfileDBItems>
              <label>💌 Your email</label>
              <input
                id="email"
                name="email"
                placeholder="your email"
                type={typeof data.email}
                defaultValue={data.email}
                key={uid()}
              />
            </ProfileDBItems>
            <hr></hr>
            <ProfileDBItems>
              <label>📸 Your picture</label>
              <input
                id="image"
                name="imge"
                placeholder="paste url to profile picture"
                type={typeof data.image}
                defaultValue={data.image}
                key={uid()}
              />
            </ProfileDBItems>
            <hr></hr>
            <ProfileDBItems>
              <label>📍 Your Homezone</label>
              <input
                id="bezirk"
                name="bezirk"
                placeholder="Your default location"
                type={typeof data.bezirk}
                defaultValue={data.bezirk}
                key={uid()}
              />
            </ProfileDBItems>

            <button type="Submit">Submit</button>
          </Form>
        </ProfileWrapper>
      </Layout>
    );
  }
}
