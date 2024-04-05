/* eslint-disable no-unused-vars */
import RecipeBanner from "./components/RecipeBanner/RecipeBanner";
import Divider from "src/components/Divider/Divider";
import CookingStep from "./components/CookingStep/CookingStep";
import ToolBar from "./components/ToolBar/ToolBar";

import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getImage } from "src/services/spoonacular";
import { capitalize } from "src/utils/common";
import axios from "axios";
import env from "src/utils/env";

import { Stack } from "react-bootstrap";
import styles from "./Recipe.module.css";

const Recipe = () => {
  const [scale, setScale] = useState(false);
  const location = useLocation();
  console.log(location.state.recipeDetail[0].recipe);
  console.log(location.state.recipeDetail[0].tags);
  const recipe = location.state.recipeDetail[0].recipe || {};
  const tags = location.state.recipeDetail[0].tags || {};
  console.log(recipe);
  // useEffect(() => {
  //   console.log("Recipe:", recipe.recipe);
  //   console.log("Tags:", recipe.tags);
  // }, [recipe]);

  if (recipe?.analyzedInstructions.length === 0) {
    return <h1>No instructions</h1>;
  }

  const onChange = () => {
    if (!scale) {
      setScale(true);
    } else {
      setScale(false);
    }
  };

  const unitChange = (ingredient, scale) => {
    let amount;
    let unit;
    if (scale) {
      amount = ingredient.measures.metric.amount;
      unit = ingredient.measures.metric.unitShort;
    } else {
      amount = ingredient.measures.us.amount;
      unit = ingredient.measures.us.unitShort;
    }
    return `${capitalize(ingredient.name)}: ${amount.toFixed(2)} ${
      unit ? unit : ""
    }`;
  };

  const CookingSteps = recipe?.analyzedInstructions[0]?.steps.map(
    (step, index) =>
      index === recipe.analyzedInstructions[0].steps.length - 1 ? (
        <CookingStep
          key={index}
          height="300px"
          image={recipe.image}
          number={index + 1}
          step={step.step}
          equipment={step.equipment ? step.equipment : ""}
          ingredients={step.ingredients ? step.ingredients : ""}
        />
      ) : (
        <CookingStep
          key={index}
          height="300px"
          image={getImage(recipe, index)}
          number={index + 1}
          step={step.step}
          equipment={step.equipment ? step.equipment : ""}
          ingredients={step.ingredients ? step.ingredients : ""}
        />
      )
  );

  return (
    <>
      {/* <h1>Recipe Page Content Test</h1>
      {CookingSteps} */}
      <Stack
        className={styles.wrapper}
        direction="vertical"
        gap={2}
        data-testid="recipe"
      >
        <hr id="top"></hr>

        <RecipeBanner
          imgURL={recipe.image}
          title={recipe.title}
          ingredients={recipe.extendedIngredients.map((ingredient) => {
            return (
              <li className={styles.ingredients}>
                {unitChange(ingredient, scale)}
              </li>
            );
          })}
          nutrients={recipe.nutrition.nutrients.map((nutrient) => {
            return (
              <li
                className={styles.nutrients}
              >{`${nutrient.name}: ${nutrient.amount} ${nutrient.unit}`}</li>
            );
          })}
          time={recipe.readyInMinutes}
          calories={Math.floor(recipe.nutrition.nutrients[0].amount)}
          size={recipe.servings}
          tags={tags}
        />

        <Divider variant={"down"} label={"Scroll Down"} width={"100%"} />

        <Stack
          className={styles.cookingStep}
          direction="vertical"
          data-testid="recipe_instruction"
        >
          {/* <CookingStep height={recipeInfo.height} image={recipeInfo.equipment[0].image} number={recipeInfo.number} step={recipeInfo.step} equipment={recipeInfo.equipment} ingredients={recipeInfo.ingredients}/>
            <CookingStep height={recipeInfo.height} image={recipeInfo.equipment[0].image} number={recipeInfo.number} step={recipeInfo.step} equipment={recipeInfo.equipment} ingredients={recipeInfo.ingredients}/>
            <CookingStep height={recipeInfo.height} image={recipeInfo.equipment[0].image} number={recipeInfo.number} step={recipeInfo.step} equipment={recipeInfo.equipment} ingredients={recipeInfo.ingredients}/> */}
          {CookingSteps}
        </Stack>
      </Stack>{" "}
      {/** End Content Wrapper */}
      <ToolBar
        className={styles.toolBar}
        onChange={onChange}
        recipe={recipe}
        checked={scale}
      />
    </>
  );
};

export default Recipe;
