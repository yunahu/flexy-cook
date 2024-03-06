/* eslint-disable no-unused-vars */
import CookingStep from './components/CookingStep/CookingStep';

import styles from './Recipe.module.css';


const dummyData = () => {
   return { /** A dummy object with present data */
      width: '30rem',
      height: '300px',  /** must be px/rem value */
      // imgURL: {'src/assets/images/sample-pic-horizontal.jpg'},
      number: 3,
      step: 'blablabla',
      ingredients: [
         {
            id: 11215,
            name: "garlic",
            localizedName: "garlic",
            image: "garlic.png"
         },
         {
            id: 11282,
            name: "onion",
            localizedName: "onion",
            image: "brown-onion.png"
         }
      ],
      equipment: [
         {
            id: 404645,
            name: "frying pan",
            image: 'src/assets/images/sample-pic-horizontal.jpg'
         }
      ],
      tagbg: 'primary'
   };
};

const Recipe = () => {
   const recipeInfo = dummyData();

	return (
      <>
         <h1>Recipe Page Content Test</h1>
         <CookingStep height={recipeInfo.height} image={recipeInfo.equipment[0].image} number={recipeInfo.number} step={recipeInfo.step} equipment={recipeInfo.equipment} ingredients={recipeInfo.ingredients}/>
         <CookingStep height={recipeInfo.height} image={recipeInfo.equipment[0].image} number={recipeInfo.number} step={recipeInfo.step} equipment={recipeInfo.equipment} ingredients={recipeInfo.ingredients}/>
         <CookingStep height={recipeInfo.height} image={recipeInfo.equipment[0].image} number={recipeInfo.number} step={recipeInfo.step} equipment={recipeInfo.equipment} ingredients={recipeInfo.ingredients}/>




      </>
	);
};

export default Recipe;
