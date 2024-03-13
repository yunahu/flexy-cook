/* eslint-disable no-unused-vars */
import CookingStep from "./components/CookingStep/CookingStep";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const RecipeTest = () => {
  const location = useLocation();
  const { recipe } = location.state || {};
  useEffect(() => {
    console.log("Recipe:", recipe);
  }, [recipe]);

  const getImage = (step) => {
    if (step.equipment[0] && step.equipment[0].image) {
      return `https://spoonacular.com/cdn/equipment_250x250/${step.equipment[0].image}`;
      // 100x100 / 250x250 / 500x500
    } else if (
      step.ingredients[0] &&
      (step.ingredients[0].image || step.ingredients[1].image)
    ) {
      return `https://spoonacular.com/cdn/ingredients_250x250/${
        step.ingredients[0].image || step.ingredients[1].image
      }`;
      // 100x100 / 250x250 / 500x500
    } else {
      return recipe.image;
    }
  };

  const CookingSteps = recipe.analyzedInstructions[0].steps.map((step, index) =>
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
        image={getImage(step)}
        number={index + 1}
        step={step.step}
        equipment={step.equipment ? step.equipment : ""}
        ingredients={step.ingredients ? step.ingredients : ""}
      />
    )
  );

  return (
    <>
      <h1>Recipe Page Content Test</h1>
      {CookingSteps}
    </>
  );
};

export default RecipeTest;
