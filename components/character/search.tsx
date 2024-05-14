"use client";

import { useEffect, useState } from "react";

interface CharacterSearchProps {
  onSearch: (searchTerm: string) => void;
  noResult: boolean;
}

export const CharacterSearch = ({
  onSearch,
  noResult,
}: CharacterSearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const debounce = setTimeout(() => {
      onSearch(searchTerm);
    }, 300); // Debounce delay in milliseconds

    return () => clearTimeout(debounce);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <input
        type="text"
        placeholder="Search characters by name"
        value={searchTerm}
        onChange={handleChange}
      />

      {noResult && (
        <>
          <p>No characters found</p>
        </>
      )}
    </>
  );
};
