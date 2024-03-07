import Dropdown from "react-bootstrap/Dropdown";
import ModifiedButton from "src/components/ModifiedButton/ModifiedButton.jsx";
import { defineScale } from "../../utils/searchFunctions";
import styles from "src/components/DropdownMenu/DropdownMenu.module.css";

import { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
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

const DropdownMenu = ({ buttonTitle, background = "success" }) => {
  const [selectedNutrient, setSelectedNutrient] = useState("");
  const [selectedMinOrMax, setSelectedMinOrMax] = useState("");
  const [amount, setAmount] = useState();

  const handleSelectChangeNutrient = (e) => {
    setSelectedNutrient(e.target.value);
  };
  const handleSelectChangeMinOrMax = (e) => {
    setSelectedMinOrMax(e.target.value);
  };
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const disabled = !selectedNutrient || !amount || !selectedMinOrMax;

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
              <Form.Select
                aria-label="Default select example"
                onChange={handleSelectChangeMinOrMax}
              >
                <option>Select Min/Max</option>
                <option value="min">Min</option>
                <option value="max">Max</option>
              </Form.Select>
            </Col>
            <Col>
              <Form.Select
                aria-label="Default select example"
                id="selectedNutrient"
                onChange={handleSelectChangeNutrient}
              >
                <option>Select Nutrient</option>
                <option value="Carbs">Carbs</option>
                <option value="Protein">Protein</option>
                <option value="Fat">Fat</option>
                <option value="Fiber">Fiber</option>
                <option value="Iron">Iron</option>
                <option value="Sodium">Sodium</option>
                <option value="Sugar">Sugar</option>
                <option value="Magnesium">Magnesium</option>
                <option value="Folate">Folate</option>
                <option value="Zinc">Zinc</option>
                <option value="FolicAcid">FolicAcid</option>
                <option value="Calcium">Calcium</option>
                <option value="Cholesterol">Cholesterol</option>
                <option value="VitaminC">VitaminC</option>
                <option value="VitaminE">VitaminE</option>
                <option value="VitaminB12">VitaminB12</option>
                <option value="Caffeine">Caffeine</option>
                <option value="Alcohol">Alcohol</option>
                <option value="Calories">Calories</option>
              </Form.Select>
            </Col>
            <Col>
              <InputGroup>
                <Form.Control
                  placeholder="Amount"
                  aria-label="Nutrient amount"
                  value={amount}
                  type="text"
                  onChange={handleAmountChange}
                />
                <InputGroup.Text>
                  {defineScale(selectedNutrient)}
                </InputGroup.Text>
              </InputGroup>
            </Col>
            <Col>
              <ModifiedButton title="+" variant="dark" disabled={disabled} />
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
