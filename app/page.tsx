import styles from "./page.module.scss";
import { CharactersList } from "@/components/charactersList";

export default function Home() {
  return (
    <main className={styles.test}>
      <CharactersList />
    </main>
  );
}
