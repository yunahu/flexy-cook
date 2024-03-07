import Button from "react-bootstrap/Button";
import styles from "./ModifiedButton.module.css";

const map = {
  primary: styles["variant-primary"],
  secondary: styles["variant-secondary"],
  success: styles["variant-success"],
  danger: styles["variant-danger"],
  warning: styles["variant-warning"],
  info: styles["variant-info"],
  light: styles["variant-light"],
  dark: styles["variant-dark"],
};

const ModifiedButton = ({ title, disabled, onClick, variant = "primary" }) => {
  return (
    <Button
      variant={variant}
      className={map[variant]}
      disabled={disabled}
      onClick={onClick}
    >
      {title}
    </Button>
  );
};

export default ModifiedButton;
