"use client";

import { useCallback, useEffect, useState } from "react";
import { CharacterItem, ICharacter } from "./item";
import { CharacterSearch } from "./search";
import { fetchData } from "@/utils/fetchData";

export const CharacterList = () => {
  const baseUrl = `https://rickandmortyapi.com/api/character/`;

  const [charactersData, setCharactersData] = useState<ICharacter[]>([]);
  const [nextPage, setNextPage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // const [fetchError, setFetchError] = useState<boolean>(false); // Skipped on error handling on Api errors for this demo
  const [searchError, setSearchError] = useState<boolean>(false);
  const [openCharacter, setOpenCharacter] = useState<number | undefined>(
    undefined
  );

  // Search callback function that sets the new data based on the search term
  const handleSearch = useCallback(
    async (searchTerm: string) => {
      if (searchTerm) {
        const searchData = await fetchData(baseUrl + `?name=${searchTerm}`);

        if (searchData) {
          setCharactersData(searchData.results);
          setNextPage(searchData.info.next);
          setSearchError(false);
        } else {
          setSearchError(true);
        }
      } else {
        const searchData = await fetchData(baseUrl);
        setCharactersData(searchData.results);
        setNextPage(searchData.info.next);
        setSearchError(false);
      }
    },
    [baseUrl]
  );

  const handleLoadMore = async () => {
    if (nextPage) {
      const nextData = await fetchData(nextPage);
      setCharactersData([...charactersData, ...nextData.results]);
      setNextPage(nextData.info.next);
    }
  };

  // Setting inital data and loading state to false
  useEffect(() => {
    const getInitialData = async () => {
      const data = await fetchData(baseUrl);

      if (data) {
        setCharactersData(data.results);
        setNextPage(data.info.next);
      }
    };

    getInitialData();
    setIsLoading(false);
  }, [baseUrl]);

  return (
    <>
      <h1>Characters</h1>

      <CharacterSearch onSearch={handleSearch} />

      {searchError && (
        <>
          <p>No characters found</p>
        </>
      )}

      {charactersData && !searchError && (
        <div className="px-5">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="font-bold text-gray-700 bg-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-3 rounded-s-lg">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Gender
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Species
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Current location
                  </th>
                  <th scope="col" className="px-6 py-3 rounded-e-lg">
                    No. Episodes
                  </th>
                </tr>
              </thead>

              <tbody>
                {charactersData.map((character) => (
                  <CharacterItem
                    key={character.id}
                    isOpen={character.id === openCharacter}
                    characterData={character}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {nextPage && (
            <div className="flex justify-center py-7">
              <button
                className="text-gray-900 bg-white border border-gray-200 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-6 py-3.5"
                onClick={handleLoadMore}
              >
                Load More
              </button>
            </div>
          )}
        </div>
      )}

      {isLoading && <p>loading</p>}
    </>
  );
};
