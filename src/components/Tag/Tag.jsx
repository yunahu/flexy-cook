import Badge from "react-bootstrap/Badge";
import styles from "./Tag.module.css";

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

// eslint-disable-next-line react/prop-types
const Tag = ({ testid, onClick, title, bg = "primary" }) => {
  return (
    <Badge
      pill
      bg={bg}
      className={map[bg]}
      as="button"
      onClick={onClick}
      data-testid={`Tag_${testid}`}
    >
      {title}
    </Badge>
  );
};

export default Tag;
