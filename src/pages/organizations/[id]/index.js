import { useRouter } from "next/router";
import useSWR from "swr";
import { IMGwrapper, IMGoverlay } from "@/components/CardBase/styledCardBase";
import Link from "next/link";
import CardCarousel from "@/components/CardCarousel/CardCarousel";

//--- for the data editing // Patching
import useSWRMutation from "swr/mutation";
import EditForm from "@/components/Edit/EditForm";

// --- end

export default function OrgDetailPage() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;

  const {
    data: organization,
    isLoading,
    error,
  } = useSWR(`/api/organizations/${id}`, {
    refreshInterval: 0,
  });

  //-----------------------------
  // --- Code until if-statements is to edit data of Orgnaization
  //-----------------------------
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
  // sollte btw auch noch da bleiben wenn die Edit Funkt ausgebaut wird
  if (!isReady || isLoading || error) return <h2>Loading...</h2>;
  if (isMutating) {
    return <h1>Submitting your changes...</h1>;
  }

  return (
    <>
      <button onClick={() => router.back()}>← back</button>
      <section>
        <IMGwrapper>
          <img src={organization.image} alt={organization.name} />
          <IMGoverlay className="hero">
            <p>📍 #{organization.bezirk}</p>
            <h2>{organization.name}</h2>
          </IMGoverlay>
        </IMGwrapper>
        <article>
          <p>{organization.description}</p>
        </article>
        <article>
          <CardCarousel organization={[organization]}></CardCarousel>
          {/* The CardCarousel expects an array, thus we wrap organization into one */}
        </article>
      </section>
      // Edit the orgs data
      <EditForm
        object={organization}
        onEditFormSubmit={onEditFormSubmit}
      ></EditForm>
    </>
  );
}
