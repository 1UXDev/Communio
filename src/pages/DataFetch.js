import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export function OrgDataFetch() {
  const {
    data: organizationsData,
    error: organizationsError,
    isLoading: organizationsIsLoading,
  } = useSWR("/api/organizations", fetcher);

  return { organizationsData, organizationsError, organizationsIsLoading };
}

export function UserDataFetch() {
  const {
    data: usersData,
    error: usersError,
    isLoading: usersIsLoading,
  } = useSWR("/api/users", fetcher);

  return { usersData, usersError, usersIsLoading };
}
