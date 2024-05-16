import Image from "next/image";
import styles from "./styles.module.scss";

export const SmallLoading = () => {
  const scale = 4;

  return (
    <div className="flex justify-center items-center py-5">
      <Image
        src={`/meeseeks-loader.gif`}
        alt="Rick dancing"
        width={256 / scale}
        height={256 / scale}
        className={`w-16 ${styles.small}`}
      />
    </div>
  );
};
