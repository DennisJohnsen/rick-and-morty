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
}

export const CharacterItem = ({
  characterData,
  isOpen,
}: CharacterItemProps) => {
  const character = characterData;

  return (
    <tr className="border-b border-gray-200 text-gray-900">
      <th scope="row" className="flex items-center px-6 py-4">
        <img
          className="w-10 h-10 rounded-full bg-gray-200"
          src={character.image}
          alt={`Portrait of ${character.name}`}
        />
        <div className="ps-3">{character.name}</div>
      </th>
      <td className="px-6 py-4 capitalize">{character.gender}</td>
      <td className="px-6 py-4 capitalize">{character.status}</td>
      <td className="px-6 py-4">{character.species}</td>
      <td className="px-6 py-4">{character.location.name}</td>
      <td className="px-6 py-4">{character.episode.length}</td>
    </tr>
  );
};
