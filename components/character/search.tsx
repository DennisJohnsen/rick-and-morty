"use client";

import { useEffect, useState } from "react";

interface CharacterSearchProps {
  onSearch: (name: string) => void;
}

export const CharacterSearch = ({ onSearch }: CharacterSearchProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const debounce = setTimeout(() => {
      onSearch(searchTerm);
    }, 300); // Debounce delay in milliseconds

    return () => clearTimeout(debounce);
  }, [searchTerm, onSearch]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    console.log("HandleChange");
  };

  return (
    <input
      type="text"
      placeholder="Search characters by name"
      value={searchTerm}
      onChange={handleChange}
    />
  );
};
