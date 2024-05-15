"use client";

import { useEffect, useState } from "react";

interface CharacterSearchProps {
  onSearch: (searchTerm: string) => void;
}

export const CharacterSearch = ({ onSearch }: CharacterSearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // Debounce method: https://dev.to/manishkc104/debounce-input-in-react-3726
  useEffect(() => {
    const debounce = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 400); // Debounce delay in milliseconds

    return () => clearTimeout(debounce);
  }, [searchTerm]);

  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <input
        type="text"
        placeholder="Search characters by name"
        value={searchTerm}
        onChange={(e) => handleChange(e)}
      />
    </>
  );
};
