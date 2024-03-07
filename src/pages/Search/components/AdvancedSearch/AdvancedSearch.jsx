import Dropdown from "react-bootstrap/Dropdown";
import ModifiedButton from "src/components/ModifiedButton/ModifiedButton.jsx";
import DeletableTag from "../DeletableTag/DeletableTag";
import { defineScale } from "../../utils/searchFunctions";
import { colorByNum } from "src/utils/common";
import dropdownStyles from "src/components/DropdownMenu/DropdownMenu.module.css";
import styles from "../AdvancedSearch/AdvancedSearch.module.css";

import { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const map = {
  info: dropdownStyles["btn-info"],
  success: dropdownStyles["btn-success"],
  //if you want to add more colors, you can add more
};

// exampleItems{
//   title: "Search"
//   ref: "/search"
//   key: "goSearch"
// }

const AdvancedSearchMenu = ({ buttonTitle, background = "success" }) => {
  const [selectedNutrient, setSelectedNutrient] = useState("");
  const [selectedMinOrMax, setSelectedMinOrMax] = useState("");
  const [amount, setAmount] = useState();
  const [tags, setTags] = useState([]);

  const handleSelectChangeNutrient = (e) => {
    setSelectedNutrient(e.target.value);
  };
  const handleSelectChangeMinOrMax = (e) => {
    setSelectedMinOrMax(e.target.value);
  };
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };
  const deleteTag = (index) => {
    setTags((previousTags) => {
      const newTags = [...previousTags];
      newTags.splice(index, 1);
      return newTags;
    });
  };

  const addTag = (e) => {
    const tag = {
      minOrMax: selectedMinOrMax,
      nutrient: selectedNutrient,
      amount: amount,
      scale: defineScale(selectedNutrient),
    };
    setTags([...tags, tag]);
  };

  const disabled = !selectedNutrient || !amount || !selectedMinOrMax;

  return (
    // if you want to add more props, you can add
    <Dropdown className={dropdownStyles.container} drop={"down-centered"}>
      <Dropdown.Toggle
        variant={background}
        className={`${map[background]} ${dropdownStyles.toggle}`}
        id="dropdown-basic"
      >
        {buttonTitle}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Container>
          <Row className={styles.searchBy}>
            <Col>Search By:</Col>
            <Col>
              <Form.Select
                aria-label="Default select example"
                onChange={handleSelectChangeMinOrMax}
              >
                <option value="None" selected>
                  Select Min/Max
                </option>
                <option value="Min">Min</option>
                <option value="Max">Max</option>
              </Form.Select>
            </Col>
            <Col>
              <Form.Select
                aria-label="Default select example"
                id="selectedNutrient"
                onChange={handleSelectChangeNutrient}
              >
                <option value="None" selected>
                  Select Nutrient
                </option>
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
              <ModifiedButton
                title="+"
                variant="dark"
                disabled={disabled}
                onClick={addTag}
              />
            </Col>
          </Row>
          <Row>
            {tags.map((tag, index) => (
              <Col key={`${tag.amount}${tag.nutrient}`}>
                <DeletableTag
                  bg={colorByNum(index)}
                  minOrMax={tag.minOrMax}
                  nutrient={tag.nutrient}
                  amount={tag.amount}
                  scale={tag.scale}
                  onClick={() => {
                    deleteTag(index);
                  }}
                />
              </Col>
            ))}
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

export default AdvancedSearchMenu;
