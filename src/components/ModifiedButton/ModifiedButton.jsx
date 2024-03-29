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
  dark: styles["variant-dark"], //for advanced search button
};

const ModifiedButton = ({
  testid,
  title,
  disabled,
  onClick,
  className,
  size,
  variant,
}) => {
  return (
    <Button
      data-testid={testid}
      variant={variant}
      className={map[variant] + " " + className}
      disabled={disabled}
      onClick={onClick}
      size={size}
    >
      {title}
    </Button>
  );
};

export default ModifiedButton;
