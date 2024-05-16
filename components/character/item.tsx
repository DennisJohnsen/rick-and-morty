import { useState } from "react";

/* eslint-disable @next/next/no-img-element */
export interface ICharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
}

export interface CharacterItemProps {
  characterData: ICharacter; // Assuming ICharacter is the correct type for characterData
  isOpen: boolean;
  onOpen: () => void;
}

export const CharacterItem = ({
  characterData,
  isOpen,
  onOpen,
}: CharacterItemProps) => {
  const character = characterData;

  return (
    <>
      <tr
        className={`border-gray-200 text-gray-900 hover:bg-gray-50 cursor-pointer relative ${
          isOpen ? " bg-gray-50 hover:bg-gray-200" : " border-b"
        }`}
        onClick={onOpen}
        aria-expanded={isOpen}
      >
        <th scope="row" className="flex items-center px-6 py-4">
          <img
            className="w-10 h-10 rounded-full bg-gray-200"
            src={character.image}
            alt={`Thumbnail of ${character.name}`}
          />
          <div className="pl-3">{character.name}</div>

          <svg
            aria-hidden="true"
            className={`absolute right-3 w-4 h-4 ${
              isOpen ? " rotate-180" : ""
            }`}
            viewBox="0 0 40 40"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m18.96 28.04-12-12c-.624-.563-.624-1.5 0-2.126.563-.562 1.5-.562 2.126 0l10.937 11 10.938-10.937c.562-.625 1.5-.625 2.125 0 .562.562.562 1.5 0 2.062l-12.063 12c-.562.625-1.5.625-2.062 0Z" />
          </svg>
        </th>
        <td className="px-6 py-4 capitalize">{character.gender}</td>
        <td className="px-6 py-4 capitalize">{character.status}</td>
        <td className="px-6 py-4">{character.species}</td>
        <td className="px-6 py-4">{character.location.name}</td>
        <td className="px-6 py-4">{character.episode.length}</td>
      </tr>

      {isOpen && (
        <tr className="border-b bg-gray-50 h-40">
          <td colSpan={6} className="p-6 pt-0">
            <div className="flex gap-6 items-start">
              <div className="flex w-1/2">
                <img
                  className="w-2/5 aspect-portrait rounded-s-lg bg-gray-300 object-cover"
                  src={character.image}
                  alt={`Thumbnail of ${character.name}`}
                />

                <div className="flex flex-col justify-start items-start p-6 bg-white rounded-e-lg grow">
                  <h2 className="font-bold text-xl mb-1">{character.name}</h2>

                  <table className="w-full text- text-left rtl:text-right relative">
                    <tbody>
                      <TableRow
                        label="Gender"
                        text={character.gender}
                        capitalize={true}
                      />
                      <TableRow
                        label="Status"
                        text={character.status}
                        capitalize={true}
                      />
                      <TableRow label="Species" text={character.species} />
                      <TableRow label="Origin" text={character.origin.name} />
                      <TableRow
                        label="Location"
                        text={character.location.name}
                      />
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex flex-col justify-start items-start p-6 bg-white rounded-lg grow">
                <h3 className="font-bold text-lg mb-2">Appears in</h3>

                <table className="w-full text- text-left rtl:text-right relative">
                  <thead className="bg-gray-200">
                    <tr>
                      <th
                        className="py-1 px-3 align-top rounded-s-lg"
                        scope="col"
                      >
                        Name
                      </th>
                      <th className="py-1 px-3 align-top" scope="col">
                        Season
                      </th>
                      <th
                        className="py-1 px-3 align-top rounded-e-lg"
                        scope="col"
                      >
                        Episode
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    <EpisodeRowProps
                      name="Something Something Darkside"
                      season={1}
                      episode={2}
                    />
                  </tbody>
                </table>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

interface DetailsRowProps {
  label: string;
  text: string;
  capitalize?: boolean;
}

const TableRow = ({ label, text, capitalize = false }: DetailsRowProps) => {
  return (
    <tr>
      <th className="py-1 pr-3 align-top" scope="row">
        {label}
      </th>
      <td className={`py-1 pr-3 align-top ${capitalize ? "capitalize" : ""}`}>
        {text}
      </td>
    </tr>
  );
};

interface EpisodeRowProps {
  name: string;
  season: number;
  episode: number;
}

const EpisodeRowProps = ({ name, season, episode }: EpisodeRowProps) => {
  return (
    <tr>
      <td className="py-1 px-3 align-top">{name}</td>
      <td className="py-1 px-3 align-top">{season}</td>
      <td className="py-1 px-3 align-top">{episode}</td>
    </tr>
  );
};
