import { useState } from "react";
import axios from "axios";

import Tag from "../../../components/Tag";
import SearchBar from "src/components/Searchbar";
import { getRecipe, getRecipeFromID } from "src/services/spoonacular";

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
          params: { includeIngredients: search },
        })
        .then(async (res) => {
          setRecipes(res.data.results);
          const recipeId = res.data.results.map((recipe) => recipe.id);
          console.log(recipeId);
          console.log(res);

          const recipeDetail = await Promise.all(
            recipeId.map((id) =>
              axios
                .get("http://localhost:3000/spoonacular/getRecipe", {
                  params: { id, includeNutrition: true },
                })
                .then((res) => res.data)
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
      <SearchBar
        text="Search"
        value={search}
        onChange={handleOnChange}
        btnClick={handleBtnClick}
        btnText="search"
      />
      {recipeDetails?.map((recipeDetail) => (
        //recipeDetails.tags?.map
        <div key={recipeDetail.id}>
          <h1>{recipeDetail.title}</h1>
          <img src={recipeDetail.image} />
          {recipeDetail.cuisines.length > 0 && (
            <Tag title={recipeDetail.cuisines} bg="secondary" />
          )}
          {recipeDetail.diets.length > 0 && (
            <Tag title={recipeDetail.diets} bg="info" />
          )}
          {recipeDetail.servings && (
            <Tag title={recipeDetail.servings} bg="dark" />
          )}
        </div>
      ))}
    </div>
  );
};

export default Search;
