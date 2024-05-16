import React, { useState, useEffect } from "react";
import { fetchData } from "@/utils/fetchData";
import { SmallLoading } from "@/components/shared/loading/small-loading";

export interface IEpisode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

export interface CharacterEpisodesProps {
  episodes: string[];
}

export const CharacterEpisodes = ({ episodes }: CharacterEpisodesProps) => {
  const [episodesData, setEpisodesData] = useState<IEpisode[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEpisodesData = async () => {
      const episodesDataArray = await Promise.all(
        episodes.map(async (episode) => {
          const episodeData = await fetchData(episode);

          return episodeData;
        })
      );

      setEpisodesData(episodesDataArray);

      // Delay to show loading state, just for fun.
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    };

    fetchEpisodesData();
  }, [episodes]);

  return (
    <div className="flex flex-col justify-start items-start p-6 bg-white rounded-lg grow">
      <h3 className="font-bold text-lg mb-2">Appears in</h3>

      <table className="w-full text- text-left rtl:text-right relative">
        <thead className="bg-gray-200">
          <tr>
            <th
              className="py-1 px-3 align-top rounded-s-lg w-11/12"
              scope="col"
            >
              Name
            </th>
            <th className="py-1 px-3 align-top whitespace-nowrap" scope="col">
              Season
            </th>
            <th
              className="py-1 px-3 align-top whitespace-nowrap rounded-e-lg"
              scope="col"
            >
              Episode
            </th>
          </tr>
        </thead>

        {!isLoading && (
          <tbody>
            {episodesData.map((episode, index) => (
              <EpisodeRow
                key={index}
                name={episode.name}
                season={parseInt(episode.episode.substring(1, 3))}
                episode={parseInt(episode.episode.substring(4, 6))}
              />
            ))}
          </tbody>
        )}
      </table>

      {isLoading && (
        <div className="self-stretch">
          <SmallLoading />
        </div>
      )}
    </div>
  );
};

interface EpisodeRowProps {
  name: string;
  season: number;
  episode: number;
}

const EpisodeRow = ({ name, season, episode }: EpisodeRowProps) => {
  return (
    <tr className="border-gray-200 [&:not(:last-child)]:border-b">
      <td className="py-2 px-3 align-top align-middle">{name}</td>
      <td className="py-2 px-3 align-top whitespace-nowrap text-right font-mono align-middle">
        {season}
      </td>
      <td className="py-2 px-3 align-top whitespace-nowrap text-right font-mono align-middle">
        {episode}
      </td>
    </tr>
  );
};

export default CharacterEpisodes;
