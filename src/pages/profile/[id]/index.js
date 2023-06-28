import useStore from "@/pages/globalstores";
import { uid } from "uid";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useEffect } from "react";
import Layout from "@/components/Layout/Layout";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
//--- for the data editing // Patching
import useSWRMutation from "swr/mutation";
import EditForm from "@/components/Edit/EditForm";

// -----------------------------------------------
// !--- The Profile Page / Components does not work properly yet, its just a placeholder and Object to later development
// -----------------------------------------------

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
  // sollte btw auch noch da bleiben wenn die Edit Funkt ausgebaut wird
  if (!isReady || isLoading || error) return <h2>Loading...</h2>;
  if (isMutating) {
    return <h1>Submitting your changes...</h1>;
  }

  if (session) {
    return (
      <Layout>
        <div className="ProfileWrapper">
          <h1>Here will be the Profile of {data.name}</h1>
          <p>
            <img
              src={session.user.image}
              style={{ width: "100px", borderRadius: "50%" }}
              alt="your profile picture"
            />
            Signed in as {session.user.name}
          </p>
          <button onClick={signOut}>Sign out</button>
          <h3>Dynamically generated Info about user:</h3>
          <ul>
            <li>Location: {data.bezirk}</li>
            <li>
              Address: {data.street}, {data.streetNumber}
            </li>
          </ul>

          <br />
          <br />

          <h3>Preferred Payment Methods</h3>
          <ul>
            {data.preferredPaymentMethod.map((method) => (
              <li key={uid()}>{method}</li>
            ))}
          </ul>

          <br />
          <br />

          <h3>Saved Payment Details</h3>
          <ul>
            {data.paymentCache.map((cache) => (
              <li key={uid()}>
                Payment Method: {cache.paymentMethod} ,
                {cache.userName ? `User Name: ${cache.userName} ` : null}
                {cache.ccNumber
                  ? `Credit Card Number: ${cache.ccNumber} `
                  : null}
                {cache.name ? `Name on Card: ${cache.name} ` : null}
                {cache.valid.length > 1
                  ? `Valid until: ${cache.valid.join("/")}`
                  : null}
              </li>
            ))}
          </ul>
          <br></br>
          <EditForm
            object={data}
            onEditFormSubmit={onEditFormSubmit}
          ></EditForm>
        </div>
      </Layout>
    );
  } else {
    router.push("/");
  }
}
