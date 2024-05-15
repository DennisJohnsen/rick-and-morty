"use client";

import { useCallback, useEffect, useState } from "react";
import { ICharacter } from "./item";
import { CharacterSearch } from "./search";

export const CharacterList = () => {
  const baseUrl = `https://rickandmortyapi.com/api/character/`;
  const [charactersData, setCharactersData] = useState<ICharacter[]>([]);
  const [nextPage, setNextPage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // const [fetchError, setFetchError] = useState<boolean>(false); // Skipped on error handling
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

  const handleSearch = useCallback(
    async (searchTerm: string) => {
      if (searchTerm) {
        const searchData = await fetchCharacters(
          baseUrl + `?name=${searchTerm}`
        );

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
    },
    [baseUrl]
  );

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                <tr key={character.id}>
                  <td>{character.name}</td>
                  <td>{character.gender}</td>
                  <td>{character.status}</td>
                  <td>{character.species}</td>
                  <td>{character.location.name}</td>
                  <td>{character.episode.length}</td>
                </tr>
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
