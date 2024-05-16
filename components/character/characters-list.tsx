"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { CharacterItem, ICharacter } from "./character";
import { CharacterSearch } from "./search";
import { fetchData } from "@/utils/fetchData";
import { LargeLoading } from "@/components/shared/loading/large-loading";

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

      setOpenCharacter(undefined);
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

  const handleOpenCharacter = (id: number) => {
    if (openCharacter !== id) {
      setOpenCharacter(id);
    } else {
      setOpenCharacter(undefined);
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

    // Delay to show loading state, just for fun.
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [baseUrl]);

  return (
    <>
      {!isLoading && (
        <>
          <div className="flex justify-center md:justify-end mb-5">
            <CharacterSearch onSearch={handleSearch} />
          </div>

          {searchError && (
            <div className="flex flex-col justify-between">
              <div
                className="px-6 py-3 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 font-bold"
                role="alert"
              >
                No characters found
              </div>

              <Image
                src={`/no-results.png`}
                alt="Mr. Meeseeks"
                width="579"
                height="638"
                className="self-center w-60 fixed bottom-0 mr-12"
              />
            </div>
          )}

          {!searchError && (
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right">
                <thead className="bg-gray-200">
                  <tr>
                    <th scope="col" className="px-6 py-3 rounded-s-lg w-3/12">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 w-1/12">
                      Gender
                    </th>
                    <th scope="col" className="px-6 py-3 w-1/12">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 w-1/12">
                      Species
                    </th>
                    <th scope="col" className="px-6 py-3 w-3/12">
                      Current location
                    </th>
                    <th scope="col" className="px-6 py-3 rounded-e-lg w-1/12">
                      Episodes
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {charactersData.map((character) => (
                    <CharacterItem
                      key={character.id}
                      isOpen={character.id === openCharacter}
                      characterData={character}
                      onOpen={() => handleOpenCharacter(character.id)}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {nextPage && !searchError && (
            <div className="flex justify-center mt-5">
              <button
                className="text-gray-900 bg-white border border-gray-200 focus:outline-none hover:bg-gray-100 focus:ring-2 focus:ring-gray-900 font-medium rounded-full text-sm px-6 py-3.5"
                onClick={handleLoadMore}
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}

      {isLoading && <LargeLoading />}
    </>
  );
};
