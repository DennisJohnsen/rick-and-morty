"use client";

import { useEffect, useState } from "react";

interface CharacterSearchProps {
  onSearch: (searchTerm: string) => void;
}

export const CharacterSearch = ({ onSearch }: CharacterSearchProps) => {
  const [searchTerm, setSearchTerm] = useState<undefined | string>(undefined);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<
    undefined | string
  >(undefined);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Debounce method: https://dev.to/manishkc104/debounce-input-in-react-3726
  useEffect(() => {
    const debounce = setTimeout(() => {
      if (searchTerm !== undefined) {
        const encodedSearchTerm = encodeURIComponent(searchTerm);
        setDebouncedSearchTerm(encodedSearchTerm);
      }
    }, 400); // Debounce delay in milliseconds

    return () => clearTimeout(debounce);
  }, [searchTerm]);

  useEffect(() => {
    // Check for userinput to avoid calling the API on intial load
    // An empty input by the user will still be an empty string
    if (typeof debouncedSearchTerm === "string") {
      onSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, onSearch]);

  return (
    <>
      <input
        type="text"
        placeholder="Search characters by name"
        value={searchTerm ? `${searchTerm}` : ""}
        onChange={(e) => handleChange(e)}
      />
    </>
  );
};
