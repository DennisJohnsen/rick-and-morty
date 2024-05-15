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
      <label htmlFor="table-search" className="sr-only">
        Search
      </label>

      <div className="relative">
        <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-700"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>

        <input
          type="text"
          placeholder="Search characters by name"
          value={searchTerm ? `${searchTerm}` : ""}
          onChange={(e) => handleChange(e)}
          id="table-search"
          className="block py-2 ps-10 pr-2 text-sm text-gray-900 border border-gray-200 rounded-lg w-80 bg-gray-50"
        />
      </div>
    </>
  );
};
