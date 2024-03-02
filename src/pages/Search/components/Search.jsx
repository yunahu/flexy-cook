import { useState } from "react";
import axios from "axios";

import Tag from "../../../components/Tag";
import SearchBar from "src/components/Searchbar";
import { capitalize } from "src/utils/common";

const Search = () => {
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [recipeDetails, setRecipeDetails] = useState([]);

  const handleOnChange = (e) => {
    setSearch(e.target.value);
  };

  const fetchRecipes = async () => {
    try {
      axios
        .get("http://localhost:3000/spoonacular/searchRecipe", {
          params: { includeIngredients: search, number: 2 },
        })
        .then(async (res) => {
          setRecipes(res.data.results);
          const recipeId = res.data.results.map((recipe) => recipe.id);
          console.log(recipeId);
          console.log(res);

          const recipeDetail = await Promise.all(
            recipeId.map((id) =>
            Promise.all([
              axios
                .get("http://localhost:3000/spoonacular/getRecipe", {
                  params: { id, includeNutrition: true },
                })
                .then((res) => res.data),
                axios
                .get("http://localhost:3000/spoonacular/getRecipeTaste", {
                  params: { id, normalize: true },
                })
                .then((res) => res.data)
              ])
            )
          );
          setRecipeDetails(recipeDetail);
          console.log(recipeDetail);
        });
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const handleBtnClick = () => {
    fetchRecipes();
  };

  const findStrongestTaste = (tastes) => {
    if (tastes.bitterness == 100){
      return "Bitter";
    }else if(tastes.fattiness == 100){
      return "Fatty";
    }else if(tastes.saltiness == 100){
      return "Salty";
    }else if(tastes.sourness == 100){
      return "Sour";
    }else if(tastes.spiciness == 100){
      return "Spicy";
    }else if(tastes.sweetness == 100){
      return "Sweet";
    }
  };

  return (
    <div>
      <SearchBar
        text="onion, canned tomato, pasta"
        value={search}
        onChange={handleOnChange}
        btnClick={handleBtnClick}
        btnText="search"
      />
      {recipeDetails?.map((recipeDetail) => (
        //recipeDetails.tags?.map
        <div key={recipeDetail[0].id}>
          <h2>{recipeDetail[0].title}</h2>
          <img src={recipeDetail[0].image} />
          {recipeDetail[0].dishTypes.length > 0 &&
            capitalize(recipeDetail[0].dishTypes[0])}
          {recipeDetail[0].readyInMinutes} minutes
          {recipeDetail[0].servings} servings

          {<Tag title={findStrongestTaste(recipeDetail[1])} bg="dark" />}

          {recipeDetail[0].cuisines.length > 0 && (
            <Tag title={capitalize(recipeDetail[0].cuisines[0])} bg="secondary" />
          )}

          {recipeDetail[0].diets.length > 0 && (
            <Tag title={capitalize(recipeDetail[0].diets[0])} bg="info" />
          )}
          {recipeDetail[0].veryPopular && <Tag title="Popular" bg="light" />}
          {recipeDetail[0].cheap && <Tag title="Cheap" bg="light" />}
          {recipeDetail[0].veryHealthy && <Tag title="Healthy" bg="light" />}
        </div>
      ))}
    </div>
  );
};

// {
//     query = undefined,
//     cuisine = undefined,
//     excludeCuisine = undefined,
//     diet = undefined,
//     intolerances = undefined,
//     equipment = undefined, // maybe not needed
//     includeIngredients = undefined,
//     excludeIngredients = undefined,
//     type = undefined,
//     instructionsRequired = undefined, //should be true
//     fillIngredients = undefined,
//     addRecipeInformation = undefined, // should be true
//     addRecipeNutrition = undefined, // should be true for nutrients search
//     recipeBoxId = undefined, // maybe not needed
//     maxReadyTime = undefined,
//     ignorePantry = undefined,
//     sort = undefined,
//     sortDirection = undefined,
//     minCarbs = undefined,
//     maxCarbs = undefined,
//     minProtein = undefined,
//     maxProtein = undefined,
//     minCalories = undefined,
//     maxCalories = undefined,
//     mixFat = undefined,
//     maxFat = undefined,
//     minAlcohol = undefined,
//     maxAlcohol = undefined,
//     minCaffeine = undefined,
//     maxCaffeine = undefined,
//     minCopper = undefined,
//     maxCopper = undefined,
//     minCalcium = undefined,
//     maxCalcium = undefined,
//     minCholine = undefined,
//     maxCholine = undefined,
//     minCholesterol = undefined,
//     maxCholesterol = undefined,
//     minFluoride = undefined,
//     maxFluoride = undefined,
//     minSaturatedFat = undefined,
//     maxSaturatedFat = undefined,
//     minVitaminA = undefined,
//     maxVitaminA = undefined,
//     minVitaminC = undefined,
//     maxVitaminC = undefined,
//     minVitaminD = undefined,
//     maxVitaminD = undefined,
//     minVitaminE = undefined,
//     maxVitaminE = undefined,
//     minVitaminK = undefined,
//     maxVitaminK = undefined,
//     minVitaminB1 = undefined,
//     maxVitaminB1 = undefined,
//     minVitaminB2 = undefined,
//     maxVitaminB2 = undefined,
//     minVitaminB3 = undefined,
//     maxVitaminB3 = undefined,
//     minVitaminB5 = undefined,
//     maxVitaminB5 = undefined,
//     minVitaminB6 = undefined,
//     maxVitaminB6 = undefined,
//     minVitaminB12 = undefined,
//     maxVitaminB12 = undefined,
//     minFiber = undefined,
//     maxFiber = undefined,
//     minFolate = undefined,
//     maxFolate = undefined,
//     minFolicAcid = undefined,
//     maxFolicAcid = undefined,
//     minIodine = undefined,
//     maxIodine = undefined,
//     minIron = undefined,
//     maxIron = undefined,
//     minMagnesium = undefined,
//     maxMagnesium = undefined,
//     minManganese = undefined,
//     maxManganese = undefined,
//     minPhosphorus = undefined,
//     maxPhosphorus = undefined,
//     minPotassium = undefined,
//     maxPotassium = undefined,
//     minSelenium = undefined,
//     maxSelenium = undefined,
//     minSodium = undefined,
//     maxSodium = undefined,
//     minSugar = undefined,
//     maxSugar = undefined,
//     minZinc = undefined,
//     maxZinc = undefined,
//     offset = undefined, //??
//     number = undefined,
// }

export default Search;
