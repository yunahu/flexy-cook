import Badge from "react-bootstrap/Badge";
import CloseButton from "react-bootstrap/CloseButton";
import styles from "../DeletableTag/DeletableTag.module.css";

const map = {
  primary: styles["bg-primary"],
  secondary: styles["bg-secondary"],
  success: styles["bg-success"],
  danger: styles["bg-danger"],
  warning: styles["bg-warning"],
  info: styles["bg-info"],
  light: styles["bg-light"],
  dark: styles["bg-dark"],
};

const DeletableTag = ({
  minOrMax,
  nutrient,
  amount,
  scale,
  onClick,
  bg = "primary",
}) => {
  return (
    <Badge bg={bg} className={map[bg]}>
      <div className={styles.budgeContent}>
        <div className={styles.nutrientData}>
          {/* ex. Min Fat 20 (g) */}
          {minOrMax} {nutrient} {Math.floor(amount)}({scale})
        </div>
        <CloseButton variant="white" onClick={onClick} />
      </div>
    </Badge>
  );
};

export default DeletableTag;
