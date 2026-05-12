import styles from "./SkyLayer.module.css";

export default function SkyLayer({ palette }) {
  const { r, g, b, op } = palette;

  // 「空の色」を3段の深度にして渡す（箱じゃなく空気）
  const a1 = op * 0.14;
  const a2 = op * 0.08;
  const a3 = op * 0.03;

  return (
    <div
      className={styles.root}
      aria-hidden="true"
      style={{
        "--sky1": `rgba(${r},${g},${b},${a1})`,
        "--sky2": `rgba(${r},${g},${b},${a2})`,
        "--sky3": `rgba(${r},${g},${b},${a3})`,
      }}
    >
      <div className={styles.clouds} />
      <div className={styles.veil} />
      <div className={styles.grain} />
    </div>
  );
}