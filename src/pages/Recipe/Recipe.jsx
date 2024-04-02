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
    return `${capitalize(ingredient.name)}: ${amount} ${unit ? unit : ""}`;
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
      <Stack className={styles.wrapper} direction="vertical" gap={2}>
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
          time={recipe.readyInMinutes}
          calories={Math.floor(recipe.nutrition.nutrients[0].amount)}
          size={recipe.servings}
          tags={tags}
        />

        <Divider variant={"down"} label={"Scroll Down"} width={"100%"} />

        <Stack className={styles.cookingStep} direction="vertical">
          {/* <CookingStep height={recipeInfo.height} image={recipeInfo.equipment[0].image} number={recipeInfo.number} step={recipeInfo.step} equipment={recipeInfo.equipment} ingredients={recipeInfo.ingredients}/>
            <CookingStep height={recipeInfo.height} image={recipeInfo.equipment[0].image} number={recipeInfo.number} step={recipeInfo.step} equipment={recipeInfo.equipment} ingredients={recipeInfo.ingredients}/>
            <CookingStep height={recipeInfo.height} image={recipeInfo.equipment[0].image} number={recipeInfo.number} step={recipeInfo.step} equipment={recipeInfo.equipment} ingredients={recipeInfo.ingredients}/> */}
          {CookingSteps}
        </Stack>
      </Stack>{" "}
      {/** End Content Wrapper */}
      <ToolBar className={styles.toolBar} onChange={onChange} recipe={recipe} />
    </>
  );
};

export default Recipe;

// /* eslint-disable no-unused-vars */
// import RecipeBanner from './components/RecipeBanner/RecipeBanner';
// import CookingStep from './components/CookingStep/CookingStep';
// import Divider from 'src/components/Divider/Divider';
// import ToolBar from './components/ToolBar/ToolBar';
// import { Stack } from 'react-bootstrap';

// import styles from './Recipe.module.css';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import env from 'src/utils/env';
// import { useEffect, useState } from 'react';

// const dummyData = () => {
//    return { /** A dummy object with present data */
//       width: '30rem',
//       height: '300px',  /** must be px/rem value */
//       // imgURL: '/src/assets/images/sample_pic.jpg',
//       imgURL: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
//       number: 3,
//       step: 'blablabla',
//       ingredients: [
//          {
//             id: 11215,
//             name: "garlic",
//             localizedName: "garlic",
//             image: "garlic.png"
//          },
//          {
//             id: 11282,
//             name: "onion",
//             localizedName: "onion",
//             image: "brown-onion.png"
//          }
//       ],
//       equipment: [
//          {
//             id: 404645,
//             name: "frying pan",
//             image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
//          }
//       ],
//       tagbg: 'primary'
//    };
// };

// const dummyDataBanner = () => {
//   return {
//     /** A dummy object with present data */
//     // width: '30rem',
//     // height: '40vh',  /** must be px/rem value */
//     imgURL: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     // imgURL: '/src/assets/images/sample_pic.jpg',
//     title: "Some Random Recipe",
//     description: "This is recipe description blablabla ... ",
//     calories: "200",
//     time: "40",
//     size: "2",

//     tags: [
//       { text: "Tag 1", type: "danger" },
//       { text: "Tag 2", type: "success" },
//       { text: "Tag 3", type: "warning" },
//     ],
//   };
// };

// const Recipe = () => {
// 	const [ recipe, setRecipe ] = useState();
// 	const recipeId = useParams().id;

//    const recipeInfo = dummyData();
//    const bannerInfo = dummyDataBanner();

// 	useEffect(() => {
// 		const run = async () => {
// 			const response = await axios.get(`${env.API_URL}/spoonacular/getRecipe`, {
// 				params: { id: recipeId, includeNutrition: true },
// 			});

// 			setRecipe(response.data);
// 		};

// 		run();
// 	}, [recipeId]);

// 	return (
//       <>
//          <Stack className={styles.wrapper} direction='vertical' gap={2}>
//             <hr id='top'></hr>

//             <RecipeBanner
//                imgURL={bannerInfo.imgURL}
//                title={bannerInfo.title}
//                description={bannerInfo.description}
//                time={bannerInfo.info}
//                calories={bannerInfo.calories}
//                size={bannerInfo.size}
//                tags={bannerInfo.tags}
//             />

//             <Divider variant={'down'} label={'Scroll Down'} width={'100%'}/>

//             <Stack className={styles.cookingStep} direction='vertical'>
//                <CookingStep height={recipeInfo.height} image={recipeInfo.equipment[0].image} number={recipeInfo.number} step={recipeInfo.step} equipment={recipeInfo.equipment} ingredients={recipeInfo.ingredients}/>
//                <CookingStep height={recipeInfo.height} image={recipeInfo.equipment[0].image} number={recipeInfo.number} step={recipeInfo.step} equipment={recipeInfo.equipment} ingredients={recipeInfo.ingredients}/>
//                <CookingStep height={recipeInfo.height} image={recipeInfo.equipment[0].image} number={recipeInfo.number} step={recipeInfo.step} equipment={recipeInfo.equipment} ingredients={recipeInfo.ingredients}/>
//             </Stack>

//          </Stack> {/** End Content Wrapper */}

//         <ToolBar
// 					className={styles.toolBar}
// 					recipe={recipe}
// 				/>

//       </>
// 	);
// };

// export default Recipe;
