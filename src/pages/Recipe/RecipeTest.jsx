/* eslint-disable no-unused-vars */
import CookingStep from "./components/CookingStep/CookingStep";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { getImage } from "src/services/spoonacular";

const RecipeTest = () => {
  const location = useLocation();
  const { recipe } = location.state || {};
  useEffect(() => {
    console.log("Recipe:", recipe);
  }, [recipe]);

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
