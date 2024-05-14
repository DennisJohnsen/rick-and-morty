"use client";

import { useCallback, useEffect, useState } from "react";
import { ICharacter } from "./item";
import { CharacterSearch } from "./search";

export const CharacterList = () => {
  const [charactersData, setCharactersData] = useState<ICharacter[]>([]);
  const [nextPage, setNextPage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const fetchCharacters = async (searchValue?: string) => {
    const url = `https://rickandmortyapi.com/api/character/${
      searchValue ? `?name=${searchValue}` : ""
    }`;

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

      if (data.results) {
        return data.results;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return false;
    }
  };

  const handleSearch = useCallback(async (searchTerm: string) => {
    console.log("test");

    if (searchTerm) {
      const searchData = await fetchCharacters(searchTerm);
      console.log(searchData);

      if (searchData) {
        setCharactersData(searchData);
      }
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCharacters();
      if (data) {
        setCharactersData(data);
      }
    };

    fetchData();
  }, []);

  const handleLoadMore = () => {
    // if (nextPage) fetchCharacters(nextPage);
  };

  return (
    <>
      <div>
        <h1>Characters</h1>

        <CharacterSearch onSearch={handleSearch} />

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

        {error && <p>Something went wrong, please try again later</p>}
      </div>
    </>
  );
};
