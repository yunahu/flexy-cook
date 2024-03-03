import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
// import { Search } from "react-bootstrap-icons";

function SearchBar({ text, value, onChange, btnClick, btnText }) {
  return (
    <InputGroup className="mb-3">
      <Form.Control
        placeholder={text}
        aria-label="Search"
        aria-describedby="basic-addon2"
        value = {value}
        type="text"
        onChange={onChange}
      />
      <Button variant="outline-secondary" id="button-addon2" onClick={btnClick}>
        {btnText}
      </Button>
    </InputGroup>
  );
}

export default SearchBar;
