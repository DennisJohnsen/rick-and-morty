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
        <>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Gender</th>
                <th>Status</th>
                <th>Species</th>
                <th>Current location</th>
                <th>No. Episodes</th>
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

          {nextPage && <button onClick={handleLoadMore}>Load More</button>}
        </>
      )}

      {isLoading && <p>loading</p>}
    </>
  );
};
