"use client";

import { useCallback, useEffect, useState } from "react";
import { ICharacter } from "./item";
import { CharacterSearch } from "./search";

export const CharacterList = () => {
  const baseUrl = `https://rickandmortyapi.com/api/character/`;
  const [charactersData, setCharactersData] = useState<ICharacter[]>([]);
  const [nextPage, setNextPage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<boolean>(false);

  const fetchCharacters = async (url: string) => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Resource not found");
        } else {
          throw new Error("Failed to fetch data");
        }
      }

      const data = await response.json();

      if (data) {
        return data;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  const handleSearch = async (searchTerm: string) => {
    if (searchTerm) {
      const searchData = await fetchCharacters(baseUrl + `?name=${searchTerm}`);

      if (searchData) {
        setCharactersData(searchData.results);
        setNextPage(searchData.info.next);
        setSearchError(false);
      } else {
        setSearchError(true);
      }
    } else {
      const searchData = await fetchCharacters(baseUrl);
      setCharactersData(searchData.results);
      setNextPage(searchData.info.next);
      setSearchError(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCharacters(baseUrl);

      if (data) {
        setCharactersData(data.results);
        setNextPage(data.info.next);
      }
    };

    fetchData();
    setIsLoading(false);
  }, []);

  const handleLoadMore = async () => {
    if (nextPage) {
      const nextData = await fetchCharacters(nextPage);
      setCharactersData([...charactersData, ...nextData.results]);
      setNextPage(nextData.info.next);
    }
  };

  return (
    <>
      <div>
        <h1>Characters</h1>

        <CharacterSearch onSearch={handleSearch} noResult={searchError} />

        {charactersData && (
          <>
            <ul>
              {charactersData.map((character) => (
                <li key={character.id}>
                  {character.id} - {character.name}
                </li>
              ))}
            </ul>

            {nextPage && (
              <div>
                <button onClick={handleLoadMore}>Load More</button>
              </div>
            )}
          </>
        )}

        {isLoading && <p>loading</p>}
      </div>
    </>
  );
};
