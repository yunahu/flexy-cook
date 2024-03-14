/* eslint-disable no-unused-vars */
import RecipeBanner from './components/RecipeBanner/RecipeBanner';
import CookingStep from './components/CookingStep/CookingStep';
import Divider from 'src/components/Divider/Divider';
import ToolBar from './components/ToolBar/ToolBar';
import { Stack } from 'react-bootstrap';

import styles from './Recipe.module.css';


const dummyData = () => {
   return { /** A dummy object with present data */
      width: '30rem',
      height: '300px',  /** must be px/rem value */
      // imgURL: '/src/assets/images/sample_pic.jpg',
      imgURL: '/src/assets/images/sample-pic-horizontal.jpg',
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
            image: '/src/assets/images/sample-pic-horizontal.jpg'
         }
      ],
      tagbg: 'primary'
   };
};

const dummyDataBanner = () => {
  return {
    /** A dummy object with present data */
    // width: '30rem',
    // height: '40vh',  /** must be px/rem value */
    imgURL: "/src/assets/images/sample-pic-horizontal.jpg",
    // imgURL: '/src/assets/images/sample_pic.jpg',
    title: "Some Random Recipe",
    description: "This is recipe description blablabla ... ",
    calories: "200",
    time: "40",
    size: "2",

    tags: [
      { text: "Tag 1", type: "danger" },
      { text: "Tag 2", type: "success" },
      { text: "Tag 3", type: "warning" },
    ],
  };
};

const Recipe = () => {
   const recipeInfo = dummyData();
   const bannerInfo = dummyDataBanner();

	return (
      <>
         <Stack className={styles.wrapper} direction='vertical' gap={2}>
            <hr></hr>

            <RecipeBanner
               imgURL={bannerInfo.imgURL}
               title={bannerInfo.title}
               description={bannerInfo.description}
               time={bannerInfo.info}
               calories={bannerInfo.calories}
               size={bannerInfo.size}
               tags={bannerInfo.tags}
            />
            
            
            <Divider variant={'down'} label={'Scroll Down'} width={'100%'}/>
            
            <Stack className={styles.cookingStep} direction='vertical'>
               <CookingStep height={recipeInfo.height} image={recipeInfo.equipment[0].image} number={recipeInfo.number} step={recipeInfo.step} equipment={recipeInfo.equipment} ingredients={recipeInfo.ingredients}/>
               <CookingStep height={recipeInfo.height} image={recipeInfo.equipment[0].image} number={recipeInfo.number} step={recipeInfo.step} equipment={recipeInfo.equipment} ingredients={recipeInfo.ingredients}/>
               <CookingStep height={recipeInfo.height} image={recipeInfo.equipment[0].image} number={recipeInfo.number} step={recipeInfo.step} equipment={recipeInfo.equipment} ingredients={recipeInfo.ingredients}/>
            </Stack>

         </Stack> {/** End Content Wrapper */}

         <ToolBar className={styles.toolBar}/>
         
      </>
	);
};

export default Recipe;
