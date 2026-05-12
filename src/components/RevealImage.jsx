import Reveal from "./Reveal";
import styles from "./RevealImage.module.css";

export default function RevealImage({ as = "div", className = "", delay = 0, children }) {
  return (
    <Reveal
      as={as}
      delay={delay}
      className={`${styles.img} ${className}`}
    >
      {children}
    </Reveal>
  );
}