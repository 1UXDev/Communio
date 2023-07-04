import { useRouter } from "next/router";
import useSWR from "swr";
import { IMGwrapper, IMGoverlay } from "@/components/CardBase/styledCardBase";

import CardCarousel from "@/components/CardCarousel/CardCarousel";
import styled from "styled-components";
import Layout from "@/components/Layout/Layout";

const BackButton = styled.button`
  background: rgba(0, 0, 0, 0.1);
  border: none;
  padding: 4px 8px;
  border-radius: 0px 6px 6px 6px;
  margin: 8px;
`;

const OrganizationSection = styled.section`
  display: flex;
  flex-flow: column;
  gap: 4px;
  padding-top: 12px;
`;

const CardCarouselWrapper = styled.article`
  padding-top: 24px;
  margin: 0px -12px;
`;

const OrganizationDescription = styled.article`
  padding: 8px;
`;

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
      <BackButton onClick={() => router.back()}>← back</BackButton>
      <OrganizationSection>
        <IMGwrapper>
          <img src={organization.image} alt={organization.name} />
          <IMGoverlay className="hero">
            <p>📍 #{organization.bezirk}</p>
            <h2>{organization.name}</h2>
          </IMGoverlay>
        </IMGwrapper>
        <OrganizationDescription>
          <p>{organization.description}</p>
        </OrganizationDescription>
        <CardCarouselWrapper>
          {console.log(organization)}
          <CardCarousel
            currentOrganizations={[organization]}
            showHeadline={false}
          ></CardCarousel>
        </CardCarouselWrapper>
      </OrganizationSection>
    </Layout>
  );
}
