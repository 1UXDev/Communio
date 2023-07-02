import { useRouter } from "next/router";
import useSWR from "swr";
import { IMGwrapper, IMGoverlay } from "@/components/CardBase/styledCardBase";
import Link from "next/link";
import CardCarousel from "@/components/CardCarousel/CardCarousel";
import Image from "next/image";
import Layout from "@/components/Layout/Layout";

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

  // Loading States
  if (!isReady || isLoading || error) return <h2>Loading...</h2>;

  return (
    <Layout>
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
          <CardCarousel organizations={[organization]}></CardCarousel>
        </article>
      </section>
    </Layout>
  );
}
