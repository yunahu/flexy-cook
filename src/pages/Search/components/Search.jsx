import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import SearchBar from "src/components/Searchbar/SearchBar";
import LargeSquareCard from "src/components/LargeSquareCard/LargeCard";
import AdvancedSearchMenu from "src/pages/Search/components/AdvancedSearch/AdvancedSearch";
import { capitalize } from "src/utils/common";
import { findStrongestTaste } from "../utils/searchFunctions";

const Search = () => {
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [recipeDetails, setRecipeDetails] = useState([]);

  const location = useLocation();
  const selectId = location.state?.id;
  console.log(selectId);

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
                  .then((res) => res.data),
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

  return (
    <div>
      <AdvancedSearchMenu />
      <SearchBar
        text="onion, canned tomato, pasta"
        value={search}
        onChange={handleOnChange}
        btnClick={handleBtnClick}
        btnText="search"
      />

      {recipeDetails?.map((recipeDetail) => {
        //recipeDetails.tags?.map

        const tags = [
          // {
          //   text: recipeDetail[0].dishTypes.length > 0  && capitalize(recipeDetail[0].dishTypes[0]),
          //   type: "primary"
          // },
          {
            text:
              recipeDetail[0].cuisines.length > 0
                ? capitalize(recipeDetail[0].cuisines[0])
                : null,
            type: "success",
          },
          {
            text:
              recipeDetail[0].diets.length > 0
                ? capitalize(recipeDetail[0].diets[0])
                : null,
            type: "warning",
          },
          {
            text:
              recipeDetail[0].dishTypes.length > 0
                ? capitalize(recipeDetail[0].dishTypes[0])
                : null,
            type: "dark",
          },
          {
            text: recipeDetail[0].veryPopular ? "Popular" : null,
            type: "info",
          },
          {
            text: recipeDetail[0].cheap ? "Cheap" : null,
            type: "info",
          },
          {
            text: recipeDetail[0].veryHealthy ? "Healthy" : null,
            type: "info",
          },
          {
            text: findStrongestTaste(recipeDetail[1]),
            type: "light",
          },
        ];

        return (
          <div key={recipeDetail[0].id}>
            <LargeSquareCard
              imgURL={recipeDetail[0].image}
              title={recipeDetail[0].title}
              ingredients={recipeDetail[0].extendedIngredients
                .map((ingredient) => ingredient.name)
                .join(", ")}
              tags={tags.filter((tag) => tag.text !== null).slice(0, 3)}
              time={recipeDetail[0].readyInMinutes}
              size={recipeDetail[0].servings}
              calories={Math.floor(
                recipeDetail[0].nutrition.nutrients[0].amount
              )}
            />
          </div>
        );
      })}
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
