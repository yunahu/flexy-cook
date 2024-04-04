import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import styles from "./SearchBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

const placeholderText = [
  "Enter ingredients with comma-separated list",
  "onion, canned tomato, cream",
];

// eslint-disable-next-line react/prop-types
function SearchBar({
  value,
  onChange,
  btnClick,
  btnText,
  className,
  testid,
  onKeyDown,
}) {
  // placeholder text change
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = () => {
      setIndex((prevIndex) => (prevIndex + 1) % placeholderText.length);
    };
    setInterval(timer, 7000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <InputGroup className={`${styles.container} ${className}`}>
      <div className={styles.formWrapper}>
        <Form.Control
          data-testid={`${testid}_form`}
          aria-label="Search"
          value={value}
          type="text"
          onChange={onChange}
          className={styles.form}
          onKeyDown={onKeyDown}
          id="search"
        />
        {value === "" && (
          <label
            data-testid="placeholder"
            htmlFor="search"
            key={placeholderText[index]}
          >
            {placeholderText[index]}
          </label>
        )}
      </div>
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
