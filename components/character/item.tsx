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
    <tr>
      <td>{character.name}</td>
      <td>{character.gender}</td>
      <td>{character.status}</td>
      <td>{character.species}</td>
      <td>{character.location.name}</td>
      <td>{character.episode.length}</td>
    </tr>
  );
};
