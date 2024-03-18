/* eslint-disable no-unused-vars */
import RecipeBanner from './components/RecipeBanner/RecipeBanner';
import Divider from 'src/components/Divider/Divider';
import CookingStep from "./components/CookingStep/CookingStep";
import ToolBar from './components/ToolBar/ToolBar';

import { useLocation } from "react-router-dom";
import { useEffect } from "react";

import { Stack } from 'react-bootstrap';
import styles from './Recipe.module.css'

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
      {/* <h1>Recipe Page Content Test</h1>
      {CookingSteps} */}

      <Stack className={styles.wrapper} direction='vertical' gap={2}>
         <hr id='top'></hr>

         <RecipeBanner
            imgURL={recipe.image}
            title={recipe.title}
            description={recipe.description}
            time={recipe.info}
            calories={recipe.calories}
            size={recipe.size}
            tags={recipe.tags}
         />
            
         <Divider variant={'down'} label={'Scroll Down'} width={'100%'}/>
            
         <Stack className={styles.cookingStep} direction='vertical'>
            {/* <CookingStep height={recipeInfo.height} image={recipeInfo.equipment[0].image} number={recipeInfo.number} step={recipeInfo.step} equipment={recipeInfo.equipment} ingredients={recipeInfo.ingredients}/>
            <CookingStep height={recipeInfo.height} image={recipeInfo.equipment[0].image} number={recipeInfo.number} step={recipeInfo.step} equipment={recipeInfo.equipment} ingredients={recipeInfo.ingredients}/>
            <CookingStep height={recipeInfo.height} image={recipeInfo.equipment[0].image} number={recipeInfo.number} step={recipeInfo.step} equipment={recipeInfo.equipment} ingredients={recipeInfo.ingredients}/> */}
            {CookingSteps}
         </Stack>

         </Stack> {/** End Content Wrapper */}

         <ToolBar className={styles.toolBar}/>
    </>
  );
};

export default RecipeTest;
