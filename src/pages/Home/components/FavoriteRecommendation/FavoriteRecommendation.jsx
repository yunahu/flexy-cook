import { useEffect, useState } from "react";
import axios from "axios";
import LargeSquareCard from "src/components/LargeSquareCard/LargeCard";
import { capitalize } from "src/utils/common";
import { findStrongestTaste } from "src/utils/spoonacularFunctinos";

const DailyRecommendation = () => {
  const [recipes, setRecipes] = useState([]);
  const [recipeDetails, setRecipeDetails] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        axios
          .get("http://localhost:3000/spoonacular/randomRecipe", {
            params: { number: 1 },
          })
          .then(async (res) => {
            setRecipes(res.data.recipes);
            console.log(res.data.recipes);
            const recipeId = res.data.recipes.map((recipe) => recipe.id);
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
            setRecipeDetails(recipeDetail);
            console.log(recipeDetail);
          });
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div>
      {recipeDetails?.map((recipeDetail) => {
        //recipeDetails.tags?.map

        const tags = [
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

export default FavoriteRecommendation;
