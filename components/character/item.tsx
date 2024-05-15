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
      <td className="px-6 py-4 whitespace-nowrap">{character.name}</td>
      <td className="px-6 py-4 whitespace-nowrap">{character.gender}</td>
      <td className="px-6 py-4 whitespace-nowrap">{character.status}</td>
      <td className="px-6 py-4 whitespace-nowrap">{character.species}</td>
      <td className="px-6 py-4 whitespace-nowrap">{character.location.name}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        {character.episode.length}
      </td>
    </tr>
  );
};
