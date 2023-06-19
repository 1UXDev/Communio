import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Organization() {
  const { data, error, isLoading } = useSWR("/api/organizations", fetcher);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <ul>
      {data.map((org) => {
        return (
          <li key={org.blz}>
            {org.name}
            {org.blz}
          </li>
        );
      })}
    </ul>
  );
}
