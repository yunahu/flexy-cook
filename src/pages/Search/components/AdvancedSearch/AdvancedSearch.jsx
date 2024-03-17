import Dropdown from "react-bootstrap/Dropdown";
import ModifiedButton from "src/components/ModifiedButton/ModifiedButton.jsx";
import DeletableTag from "../DeletableTag/DeletableTag";
import DividerWithText from "../DividerWithText/DividerWithText";
import { defineScale } from "../../utils/searchFunctions";
import { colorByNum } from "src/utils/common";
import dropdownStyles from "src/components/DropdownMenu/DropdownMenu.module.css";
import styles from "../AdvancedSearch/AdvancedSearch.module.css";

import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Container from "react-bootstrap/Container";
import { useLocation } from "react-router-dom";

const map = {
  info: dropdownStyles["btn-info"],
  success: dropdownStyles["btn-success"],
};

// exampleItems{
//   title: "Search"
//   ref: "/search"
//   key: "goSearch"
// }

const AdvancedSearchMenu = ({ background = "success", onTagsChange }) => {
  const [selectedNutrient, setSelectedNutrient] = useState("");
  const [selectedMinOrMax, setSelectedMinOrMax] = useState("");
  const [amount, setAmount] = useState(null);
  const [tags, setTags] = useState([]);

  const location = useLocation();

  useEffect(() => {
    setTags([]);
  }, [location.pathname]);

  const handleSelectChangeNutrient = (e) => {
    if (e.target.value != "") {
      setSelectedNutrient(e.target.value);
    }
  };

  const handleSelectChangeMinOrMax = (e) => {
    if (e.target.value != "") {
      setSelectedMinOrMax(e.target.value);
    }
  };

  const handleAmountChange = (e) => {
    // if the input is not a number or the number is greater than 100000, alert & delete input
    if (
      isNaN(e.target.value) ||
      e.target.value > 100000 ||
      e.target.value < 0
    ) {
      alert("Please enter a valid amount");
      setAmount("");
    } else {
      setAmount(e.target.value);
    }
  };

  // handle delete tags
  const deleteTag = (index) => {
    setTags((previousTags) => {
      const newTags = [...previousTags];
      newTags.splice(index, 1);
      return newTags;
    });
  };

  // handle add tags
  const addTag = (e) => {
    const tag = {
      minOrMax: selectedMinOrMax,
      nutrient: selectedNutrient,
      amount: amount,
      scale: defineScale(selectedNutrient),
    };

    // handle duplicate tags
    const duplicateTag = tags.find(
      (existingTag) =>
        existingTag.minOrMax === tag.minOrMax &&
        existingTag.nutrient === tag.nutrient
    );
    if (duplicateTag) {
      alert("The same combination of nutrients and range tag exists.");
      return;
    }

    setTags([...tags, tag]);
    setSelectedNutrient("");
    setSelectedMinOrMax("");
    setAmount("");
    onTagsChange([...tags, tag]);
  };

  // if the input is empty, disable the button
  const disabled =
    selectedNutrient === "" ||
    amount === "" ||
    amount === null ||
    selectedMinOrMax === "";

  return (
    <Dropdown className={dropdownStyles.container} drop={"down-centered"}>
      <Dropdown.Toggle
        variant={background}
        className={`${map[background]} ${dropdownStyles.toggle}`}
        id="dropdown-basic"
      >
        Advanced Search
      </Dropdown.Toggle>
      <Dropdown.Menu className={styles.menuContainer}>
        <Container>
          <div className={styles.divider}>
            <DividerWithText text="Select filter" />
          </div>
          <div>
            <span className={styles.searchByText}>Search By:</span>
            <div className={styles.searchBy}>
              <Form.Select
                aria-label="MinOrMax"
                value={selectedMinOrMax}
                onChange={handleSelectChangeMinOrMax}
              >
                <option selected value="">
                  Select Range
                </option>
                <option value="Min">Min</option>
                <option value="Max">Max</option>
              </Form.Select>
              <Form.Select
                aria-label="Nutrient"
                id="selectedNutrient"
                onChange={handleSelectChangeNutrient}
                value={selectedNutrient}
              >
                <option selected value="">
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
              <InputGroup className={styles.amountInput}>
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
              <ModifiedButton
                className={styles.addTagButton}
                title="+"
                variant="dark"
                size="sm"
                disabled={disabled}
                onClick={addTag}
              />
            </div>
          </div>
          <DividerWithText text="Selected filters" />
          <div className={styles.tags}>
            {tags.map((tag, index) => (
              <DeletableTag
                key={`${tag.amount}${tag.nutrient}`}
                bg={colorByNum(index)}
                minOrMax={tag.minOrMax}
                nutrient={tag.nutrient}
                amount={tag.amount}
                scale={tag.scale}
                onClick={() => {
                  deleteTag(index);
                }}
              />
            ))}
          </div>
        </Container>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default AdvancedSearchMenu;
