"use client";

import { useEffect, useState } from "react";
import { ICharacter } from "./item";
import { CharacterSearch } from "./search";

export const CharacterList = () => {
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [nextPage, setNextPage] = useState<string>("");
  const [isInit, setIsInit] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const fetchData = async (url: string) => {
    try {
      const response = await fetch(url);
      setIsLoading(true);

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();

      if (!isInit) {
        setCharacters(data.results);
        setIsInit(true);
      } else {
        setCharacters((prevCharacters) => [...prevCharacters, ...data.results]);
      }

      setNextPage(data.info.next);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData("https://rickandmortyapi.com/api/character");
  }, []);

  const handleLoadMore = () => {
    if (nextPage) fetchData(nextPage);
  };

  const handleSearch = (searchTerm: string) => {};

  return (
    <>
      <div>
        <h1>Characters</h1>

        <CharacterSearch onSearch={handleSearch} />

        {characters.length > 0 && (
          <>
            <ul>
              {characters.map((character) => (
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
