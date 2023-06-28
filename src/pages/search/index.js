import { useState, useEffect } from "react";
import useStore from "../globalstores";
import Link from "next/link";
import { uid } from "uid";
import styled from "styled-components";
import Layout from "@/components/Layout/Layout";
import Image from "next/image";

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
  const currentOrganizations =
    useStore((state) => state.currentOrganizations) || [];
  const [searchTerm, setSearchTerm] = useState("");

  function findOrganizations(event) {
    setSearchTerm(event.target.value.toLowerCase());
  }

  return (
    <Layout>
      <div className="SearchWrapper">
        <h1>Find Opportunities to help</h1>
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
            {currentOrganizations
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
    </Layout>
  );
}
