import Dropdown from "react-bootstrap/Dropdown";
import styles from "src/components/DropdownMenu/DropdownMenu.module.css";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const map = {
  info: styles["btn-info"],
  success: styles["btn-success"],
  //if you want to add more colors, you can add more
};

// exampleItems{
//   title: "Search"
//   ref: "/search"
//   key: "goSearch"
// }

const DropdownMenu = ({ buttonTitle, items, background = "success" }) => {
  return (
    // if you want to add more props, you can add
    <Dropdown className={styles.container}>
      <Dropdown.Toggle
        variant={background}
        className={map[background]}
        id="dropdown-basic"
      >
        {buttonTitle}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Container>
          <Row>
            <Col>Search By:</Col>
            <Col>
              <Form.Select aria-label="Default select example">
                <option>Open this select menu</option>
                <option value="min">Min</option>
                <option value="max">Max</option>
              </Form.Select>
            </Col>
            <Col>
              <Form.Select aria-label="Default select example">
                <option>Open this select menu</option>
                <option value="Carbs">Carbs</option>
                <option value="Protain">Protein</option>
                <option value="Fat">Fat</option>
                <option value="Caffeine">Caffeine</option>
                <option value="Alcohol">Alcohol</option>
                <option value="Calories">Calories</option>
                <option value="Fat">Fat</option>
                <option value="Fat">Fat</option>
              </Form.Select>
            </Col>
          </Row>
          {/* {items.map((item) => (
          <Dropdown.Item key={item.key} href={item.ref}>
            {item.title}
          </Dropdown.Item>
        ))} */}
        </Container>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownMenu;
