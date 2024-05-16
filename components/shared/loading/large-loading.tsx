import Image from "next/image";
import styles from "./styles.module.scss";

export const LargeLoading = () => {
  return (
    <div className="flex justify-center items-center h-svh w-svw fixed inset-0">
      <Image
        src={`/rick-dancing.gif`}
        alt="Rick dancing"
        width="259"
        height="498"
        className={`w-48 ${styles.large} rounded-2xl`}
      />
    </div>
  );
};
