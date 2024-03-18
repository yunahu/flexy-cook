import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import axios from "axios";
import throttle from "lodash.throttle";

import SearchBar from "src/components/SearchBar/SearchBar";
import AdvancedSearchMenu from "src/pages/Search/components/AdvancedSearch/AdvancedSearch";
import SearchCard from "src/pages/Search/components/SearchCard/SearchCard.jsx";
import { capitalize } from "src/utils/common";
import { findStrongestTaste } from "src/utils/spoonacularFunctions";

import styles from "src/pages/Search/Search.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

const MAX_RECIPE_NUM = 12;

const SearchTest = () => {
  const [search, setSearch] = useState("");
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [nutrientsTags, setNutrientsTags] = useState([]);

  const location = useLocation();
  const { ingredients, tags } = location.state || {};

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setSearch(e.target.value);
  };

  const handleTagsChange = (nutrientsTags) => {
    setNutrientsTags(nutrientsTags);
  };

  // scroll handling
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.scrollHeight - 100 &&
        !loading &&
        recipeDetails?.length < MAX_RECIPE_NUM
      ) {
        fetchRecipes();
      }
    };
    const throttledScroll = throttle(handleScroll, 500);
    window.addEventListener("scroll", throttledScroll);
    return () => window.removeEventListener("scroll", throttledScroll);
  }, [loading, recipeDetails]);

  const fetchRecipes = async () => {
    setLoading(true);
    let nutrientParams = {};

    // get nutrient data from tags to create parameters
    if (tags) {
      nutrientParams = tags.reduce((params, tag) => {
        const nutrientName =
          tag.nutrient.charAt(0).toUpperCase() + tag.nutrient.slice(1);
        params[`${tag.minOrMax.toLowerCase()}${nutrientName}`] = tag.amount;
        return params;
      }, {});
    } else {
      nutrientParams = nutrientsTags.reduce((params, tag) => {
        const nutrientName =
          tag.nutrient.charAt(0).toUpperCase() + tag.nutrient.slice(1);
        params[`${tag.minOrMax.toLowerCase()}${nutrientName}`] = tag.amount;
        return params;
      }, {});
    }

    try {
      axios
        .get("http://localhost:3000/spoonacular/searchRecipe", {
          params: {
            offset: recipeDetails?.length || 0,
            includeIngredients: ingredients ? ingredients : search,
            number: 6,
            ...nutrientParams,
          },
        })
        .then(async (res) => {
          const recipeId = res.data.results.map((recipe) => recipe.id);
          console.log(recipeId);

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
          setRecipeDetails((prevRecipeDetail) => [
            ...(prevRecipeDetail || []),
            ...recipeDetail,
          ]);
          console.log(recipeDetail);
          setLoading(false);
        });
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  useEffect(() => {
    console.log("Ingredients:", ingredients);
    console.log("Tags:", tags);
    if (ingredients || tags?.length > 0) {
      fetchRecipes();
    }
  }, [ingredients, tags]);

  const handleBtnClick = () => {
    fetchRecipes();
  };

  return (
    <>
      <div>
        <AdvancedSearchMenu onTagsChange={handleTagsChange} />
        <SearchBar
          text="onion, canned tomato, pasta"
          value={search}
          onChange={handleOnChange}
          btnClick={handleBtnClick}
          btnText="search"
        />
        <div className={styles.container}>
          {recipeDetails?.map((recipeDetail) => {
            const tags = [
              {
                text: recipeDetail[0].veryPopular ? "Popular" : null,
                type: "primary",
              },
              {
                text: recipeDetail[0].cheap ? "Cheap" : null,
                type: "info",
              },
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
                text: recipeDetail[0].veryHealthy ? "Healthy" : null,
                type: "info",
              },
              {
                text: findStrongestTaste(recipeDetail[1]),
                type: "light",
              },
            ];

            return (
              <SearchCard
                key={recipeDetail[0].id}
                imgURL={recipeDetail[0].image}
                width="30rem"
                height="400rem"
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
                onClick={() =>
                  navigate("/testRecipe", {
                    state: { recipe: recipeDetail[0] },
                  })
                }
              />
            );
          })}
          {loading && <div><FontAwesomeIcon icon={faSpinner} spinPulse />&ensp;Loading...</div>}
          {!loading && recipeDetails && recipeDetails?.length == 0 && (
            <div><FontAwesomeIcon icon={faCircleExclamation} />&ensp;Recipe Not Found</div>
          )}
        </div>
      </div>
    </>
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

export default SearchTest;
