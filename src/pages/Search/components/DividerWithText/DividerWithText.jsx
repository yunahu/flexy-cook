import styles from "./DividerWithText.module.css";

const DividerWithText = ({ text }) => {
  return (
    <div className={styles.divider}>
      <hr className={`${styles.hrLine} ${styles.short}`} />
      <div className={`${styles.hrLine} ${styles.hrText}`}>{text}</div>
      <hr className={`${styles.hrLine} ${styles.long}`} />
    </div>
  );
};

export default DividerWithText;
