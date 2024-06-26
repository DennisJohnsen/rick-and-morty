import { CharacterList } from "@/components/character/characters-list";
import Image from "next/image";

export default function Home() {
  const imgScale = 4;

  return (
    <div className="flex justify-center">
      <div className="max-w-screen-lg w-full px-5 py-10">
        <div className="flex flex-col items-center mb-20">
          <Image
            src={`/rick-and-morty-logo.png`}
            alt="Rick dancing"
            width={3274 / imgScale}
            height={1000 / imgScale}
            className="max-w-full w-2/3 md:w-1/2 mb-3"
          />

          <h1 className="font-light text-xl text-center">
            List of all Rick and Morty characters
          </h1>
        </div>

        <CharacterList />
      </div>
    </div>
  );
}
