"use client";

import { Company } from "@/generated/prisma/browser";
import { useRef, useState } from "react";
import useCompany from "../store/CompanyStore";

export default function SearchPanel() {
  const searchRef = useRef<HTMLInputElement>(document.createElement("input"));
  const [searchResults, setSearchResults] = useState<Company[]>([]);
  const { setCompany } = useCompany();

  const search = async () => {
    if (searchRef.current.value === "") return;
    const res = await fetch(
      `/api/search?query=${encodeURIComponent(searchRef.current.value || "")}`
    );
    const data = await res.json();
    setSearchResults(data);
  };

  const fetchCompany = async (id: number) => {
    searchRef.current.value = "";
    setSearchResults([]);
    setCompany(await (await fetch(`/api/${id}`)).json());
  };

  const select = (id: number) => fetchCompany(id);

  return (
    <search className="text-center">
      <input
        ref={searchRef}
        type="search"
        placeholder="Search..."
        name="q"
        className="rounded-2xl p-2 bg-blue-100"
        onChange={search}
      />
      {Boolean(searchResults.length) && (
        <div id="search-results">
          {searchResults.map(({ name, ticker, id }) => (
            <div
              key={ticker}
              onClick={() => select(id)}
              className="search-result-item"
            >
              {name} ({ticker})
            </div>
          ))}
        </div>
      )}
    </search>
  );
}
