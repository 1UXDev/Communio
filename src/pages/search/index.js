import { useState, useEffect } from "react";
import useStore from "../globalstore";

// -----------------------------------------------
// !--- The Search Page / Components does not work properly yet, its just a placeholder and Object to later development
// -----------------------------------------------

export default function Search() {
  const allOrganizations = useStore((state) => state.allOrganizations);
  const [searchTerm, setSearchTerm] = useState("");

  function findOrganizations(event) {
    setSearchTerm(event.target.value.toLowerCase());
  }

  useEffect(() => {
    console.log(allOrganizations);
    console.log(allOrganizations.includes(searchTerm));
  }, [searchTerm]);

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

      <section>
        <h3>Your Search results</h3>
        {allOrganizations
          .filter((org) => org.name.includes(searchTerm))
          .map((org) => {
            return <li key={org.id}>{org.name}</li>;
          })}
      </section>
    </div>
  );
}
