import { useState } from "react";
import { useStore } from "../globalstore";

export default function Search() {
  const allOrganizationData = useStore((state) => state.allOrganizationData);
  console.log(allOrganizationData);
  const [searchTerm, setSearchTerm] = useState("");

  function findOrganizations(event) {
    setSearchTerm(event.target.value);
  }

  return (
    <div className="SearchWrapper">
      <h1>Here will be the search</h1>
      <section>
        <label htmlFor="site-search">
          Explore Organizations and Donations:
        </label>
        <input
          type="search"
          id="site-search"
          name="q"
          onChange={findOrganizations}
        />
        <button>Search</button>
      </section>

      {/* <section>
        <h3>Your Search results</h3>
        {allOrganizationData
          .filter((org) => org.name === searchTerm)
          .map((org) => {
            return <li>{org.name}</li>;
          })}
      </section> */}
    </div>
  );
}
