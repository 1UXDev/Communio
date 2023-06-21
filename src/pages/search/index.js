import { useState, useEffect } from "react";
import useStore from "../globalstore";
import Link from "next/link";
import { uid } from "uid";
import styled from "styled-components";

const SearchResults = styled.ul`
  padding-top: 24px;
  list-style-type: none;
  display: flex;
  flex-flow: column;
  gap: 12px;
  & li * {
    display: flex;
    gap: 12px;
    align-items: center;
  }
`;

export default function Search() {
  const allOrganizations = useStore((state) => state.allOrganizations) || [];
  const [searchTerm, setSearchTerm] = useState("");

  function findOrganizations(event) {
    setSearchTerm(event.target.value.toLowerCase());
  }

  return (
    <section>
      <div className="SearchWrapper">
        <h1>Search for Purpose</h1>
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
          <SearchResults>
            {allOrganizations
              .filter((org) => org.name.toLowerCase().includes(searchTerm))
              .map((org) => {
                return (
                  <li key={uid()}>
                    <Link href={`/organizations/${org._id}`}>
                      <img
                        src={org.image}
                        alt={`image of ${org.name}`}
                        width="50px"
                        height="50px"
                      ></img>
                      <div>
                        <h2>{org.name}</h2>
                        <p>{org.bezirk}</p>
                      </div>
                    </Link>
                  </li>
                );
              })}
          </SearchResults>
        </section>
      </div>
    </section>
  );
}
