import { CharacterSearch } from "@/components/character/search";
import { CharacterList } from "@/components/character/list";

import styles from "./page.module.scss";

export default function Home() {
  return (
    <main>
      <CharacterList />
    </main>
  );
}
