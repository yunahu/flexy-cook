import { useState } from "react";
import Tag from "./Tag";
import { getRecipe, getRecipeFromID } from "src/services/spoonacular";

// const Counter = () => {
//   const [count, setCount] = useState(0);

//   const handleMinusClick = () => {
//     setCount(count - 1);
//   }

//   const handlePlusClick = () => {
//     setCount(count + 1);
//   }

//   const countColor = count % 2 === 0 ? "green" : "red";

//   return (
//     <div>
//       <button onClick={handleMinusClick}>-</button>
//       <h2 style={{ color: countColor }}>{count}</h2>
//       <button onClick={handlePlusClick}>+</button>
//     </div>
//   );
// }

const Search = ({ btnText = "Search" }) => {
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [recipeDetails, setRecipeDetails] = useState([]);

  const handleOnChange = (e) => {
    setSearch(e.target.value);
  };

  const fetchRecipes = async () => {
    try {
      getRecipe({ includeIngredients: search }).then(async (res) => {
        console.log(res);
        setRecipes(res.results);

        const recipeId = res.results.map((recipe) => recipe.id);
        console.log(recipeId);

        const recipeDetail = await Promise.all(
          recipeId.map((id) =>
            getRecipeFromID({ id: id, includeNutrition: true })
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
      <input
        type="text"
        placeholder={"Search"}
        value={search}
        onChange={handleOnChange}
      />
      <button onClick={handleBtnClick}>{btnText}</button>
      {recipeDetails?.map((recipeDetail) => (
        //recipeDetails.tags?.map
        <div key={recipeDetail.id}>
          <h1>{recipeDetail.title}</h1>
          <img src={recipeDetail.image} />
          {recipeDetail.cuisines.length > 0 && <Tag title={recipeDetail.cuisines} bg="secondary" />}
          {recipeDetail.diets.length > 0 && <Tag title={recipeDetail.diets} bg="info"/>}
          {recipeDetail.servings && <Tag title={recipeDetail.servings} bg="dark" />}
        </div>
      ))}
    </div>
  );
};

export default Search;
