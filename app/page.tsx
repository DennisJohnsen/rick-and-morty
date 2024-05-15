import { CharacterSearch } from "@/components/character/search";
import { CharacterList } from "@/components/character/list";
import Image from "next/image";

export default function Home() {
  const scale = 4;
  return (
    <div className="flex justify-center">
      <div className="max-w-screen-lg w-full px-5 py-10">
        <div className="flex flex-col items-center mb-12">
          <Image
            src={`/rick-and-morty-logo.png`}
            alt="Rick dancing"
            width={3274 / scale}
            height={1000 / scale}
            className="max-w-lg mb-3"
          />

          <h1>Database of all Rick and Morty characters</h1>
        </div>

        <CharacterList />
      </div>
    </div>
  );
}
