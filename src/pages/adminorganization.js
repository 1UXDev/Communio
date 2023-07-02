import EditForm from "@/components/Edit/EditForm";
import { SessionProvider } from "next-auth/react";
import { useSession, signIn, signOut } from "next-auth/react";
import styled from "styled-components";

const AdminWrapper = styled.section``;

export default function AdminOrganization() {
  const { data: session } = useSession();

  const {
    data: organization,
    isLoading,
    error,
  } = useSWR(`/api/organizations/${session.user._id}`, {
    refreshInterval: 0,
  });

  async function onEditFormSubmit(organization, event) {
    event.preventDefault();
    await trigger(organization);
    //router.push("/");
  }

  // destructure SWR Mutation into trigger for function above
  const { trigger, isMutating } = useSWRMutation(
    `/api/organizations/${id}`,
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
    } else {
      console.error(`Error: ${response.status}`);
    }
  }

  // Loading States
  if (!isReady || isLoading || error) return <h2>Loading...</h2>;
  if (isMutating) {
    return <h1>Submitting your changes...</h1>;
  }

  return (
    <AdminWrapper>
      <section>
        {" "}
        <button type="button" onClick={signOut}>
          Sign Out
        </button>
      </section>

      <h1>Admin page of </h1>
      <section>
        {" "}
        <h2>Products you need</h2>
        <article>
          {" "}
          <h3> Add a new product</h3>
        </article>
        <article>
          {" "}
          <h3> Current Products </h3>
        </article>
      </section>

      <section>
        <h2>Edit Data about your Organization</h2>
      </section>

      <EditForm
        object={organization}
        onEditFormSubmit={onEditFormSubmit}
      ></EditForm>
    </AdminWrapper>
  );
}
