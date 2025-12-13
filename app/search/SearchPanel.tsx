"use client";

import { useRef, useState } from "react";

export default function SearchPanel() {
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchResults, setSearchResults] = useState([]);

  const search = async () => {
    const res = await fetch(
      `/api/search?query=${encodeURIComponent(searchRef.current?.value || "")}`
    );
    const data = await res.json();
    setSearchResults(data);
  };

  return (
    <search>
      <input
        ref={searchRef}
        type="search"
        name="q"
        className="p-2 bg-blue-100"
        onChange={search}
      />
      <div id="search-results">
        {searchResults.length &&
          searchResults.map(({ name, ticker }) => (
            <div key={ticker} className="search-result-item">
              {name} ({ticker})
            </div>
          ))}
      </div>
    </search>
  );
}
