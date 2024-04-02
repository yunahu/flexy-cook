import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import styles from "./SearchBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

// eslint-disable-next-line react/prop-types
function SearchBar({
  text,
  value,
  onChange,
  btnClick,
  btnText,
  className,
  testid,
  onKeyDown,
}) {
  return (
    <InputGroup className={`${styles.container} ${className}`}>
      <Form.Control
        data-testid={`${testid}_form`}
        placeholder={text}
        aria-label="Search"
        value={value}
        type="text"
        onChange={onChange}
        className={styles.form}
      />
      <Button
        data-testid={`${testid}_button`}
        variant="outline-secondary"
        className={styles["outline-secondary"]}
        onClick={btnClick}
      >
        <FontAwesomeIcon icon={faSearch} className={styles.icon} />
        {btnText}
      </Button>
    </InputGroup>
  );
}

export default SearchBar;
