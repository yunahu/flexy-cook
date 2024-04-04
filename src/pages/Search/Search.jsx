import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import axios from "axios";
import throttle from "lodash.throttle";
import env from "src/utils/env";

import Tags from "src/components/Cards/Tags/Tags";
import StickyButton from "src/components/StickyButton/StickyButton";
import SearchBar from "src/components/SearchBar/SearchBar";
import AdvancedSearchMenu from "src/pages/Search/components/AdvancedSearch/AdvancedSearch";
import SearchCard from "src/pages/Search/components/SearchCard/SearchCard";
import SearchBy from "src/pages/Search/components/SearchBy/SearchBy";
import {
  createTags,
  createLocationData,
  createNutrientParam,
} from "src/utils/spoonacularFunctions";
import { createRecommendationTags } from "src/utils/recommendationTags";

import styles from "src/pages/Search/Search.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { Stack } from "react-bootstrap";

const MAX_RECIPE_NUM = 12;
const recommendationTags = createRecommendationTags(10);

const Search = () => {
  const location = useLocation();

  const [search, setSearch] = useState(location.state?.search || "");
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [maxReached, setMaxReached] = useState(false);
  const [nutrientsTags, setNutrientsTags] = useState(
    location.state?.nutrient || []
  );

  let { ingredients, tags, tagInfo } = location.state || {};

  const navigate = useNavigate();

  const handleTagsChange = (nutrientsTags) => {
    setNutrientsTags(nutrientsTags);
  };

  const handleOnChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (search !== "" || nutrientsTags.length > 0) {
      fetchRecipes();
    }
  }, [location.state]);

  // change number of recommendation tags based on the width of the window
  const getTagNum = (recommendationTags) => {
    if (window.innerWidth < 575) {
      return recommendationTags.slice(5);
    } else if (window.innerWidth < 990) {
      return recommendationTags.slice(6);
    } else {
      return recommendationTags;
    }
  };

  // scroll handling
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.scrollHeight - 100 &&
        !loading &&
        recipeDetails?.length < MAX_RECIPE_NUM &&
        !maxReached
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
    let tagParams = {};

    // get nutrient data from tags to create parameters
    if (tags) {
      nutrientParams = createNutrientParam(tags);
    } else {
      nutrientParams = createNutrientParam(nutrientsTags);
    }

    // get tag info to search
    if (tagInfo) {
      tagParams = tagInfo.reduce((params, tag) => {
        params[`${tag.key}`] = tag.amount;
        return params;
      }, {});
    }

    try {
      axios
        .get(`${env.API_URL}/spoonacular/searchRecipe`, {
          params: {
            offset: recipeDetails?.length || 0,
            includeIngredients: ingredients ? ingredients : search,
            number: 6,
            ...nutrientParams,
            ...tagParams,
          },
        })
        .then(async (res) => {
          const recipeId = res.data.results.map((recipe) => recipe.id);
          if (recipeId < 6) {
            setMaxReached(true);
          }

          const recipeDetail = await Promise.all(
            recipeId.map((id) =>
              Promise.all([
                axios
                  .get(`${env.API_URL}/spoonacular/getRecipe`, {
                    params: { id, includeNutrition: true },
                  })
                  .then((res) => res.data),
                axios
                  .get(`${env.API_URL}/spoonacular/getRecipeTaste`, {
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
          setLoading(false);
        });
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  useEffect(() => {
    if (tagInfo || ingredients || tags?.length > 0) {
      fetchRecipes();
    }
  }, [tagInfo, ingredients, tags]);

  const handleBtnClick = () => {
    setNutrientsTags(nutrientsTags);
    setSearch(search);
    setRecipeDetails(null);
    navigate("/search", {
      replace: true,
      state: {
        search: search,
        nutrient: nutrientsTags,
      },
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleBtnClick();
    }
  };

  return (
    <div>
      <div className={styles.background}>
        <div className={styles.searchBar}>
          <SearchBar
            testid="searchbar"
            value={search}
            onChange={handleOnChange}
            btnClick={handleBtnClick}
            btnText="search"
            onKeyDown={handleKeyDown}
          />
          <AdvancedSearchMenu
            onTagsChange={handleTagsChange}
            testid="advanced_search"
            background="primary"
          />
        </div>
        <div className={styles.recommendedTags}>
          <h3>Recommended Tags</h3>
          <div className={styles.tags}>
            <Tags tags={getTagNum(recommendationTags)} className={styles.tag} />
          </div>
        </div>
      </div>
      <hr />

      {recipeDetails && <p className={styles.text}>Search Results:</p>}
      <div className={styles.container}>
        {recipeDetails && (
          <SearchBy
            className={styles.searchBy}
            ingredients={location.state?.search}
            ingredientsFromNav={ingredients}
            tag={tagInfo}
            nutrient={location.state?.nutrient}
            nutrientFromNav={tags}
          />
        )}
        {recipeDetails?.map((recipeDetail) => {
          return (
            <SearchCard
              testid="1"
              key={recipeDetail[0].id}
              imgURL={recipeDetail[0].image}
              width="30rem"
              height="400rem"
              title={recipeDetail[0].title}
              ingredients={recipeDetail[0].extendedIngredients
                .map((ingredient) => ingredient.name)
                .join(", ")}
              tags={createTags(recipeDetail)
                .filter((tag) => tag.text !== null)
                .slice(0, 4)}
              time={recipeDetail[0].readyInMinutes}
              size={recipeDetail[0].servings}
              calories={Math.floor(
                recipeDetail[0].nutrition.nutrients[0].amount
              )}
              onClick={() =>
                navigate(`/recipe/${recipeDetail[0].id}`, {
                  state: {
                    recipeDetail: createLocationData(
                      recipeDetail[0],
                      createTags(recipeDetail)
                    ),
                  },
                })
              }
            />
          );
        })}
        <StickyButton />
        {loading && (
          <div className={styles.msg} data-testid="loading">
            <FontAwesomeIcon icon={faSpinner} spinPulse />
            &ensp;Loading...
          </div>
        )}
        {!loading && recipeDetails && recipeDetails?.length == 0 && (
          <Stack
            className={styles.msg}
            direction="vertical"
            gap={5}
            data-testid="not_found"
          >
            <span>
              <FontAwesomeIcon
                icon={faCircleExclamation}
                className="text-danger"
              />
              &ensp;Recipe Not Found
            </span>

            <span className={styles.secondaryMsg}>
              <h5>What You Can Do:</h5>
              <ul className="h6">
                <li>Check your spelling</li>
                <li>Use ingredients as searching keywords</li>
                <li>
                  Double check the filter setting in Advanced Search panel
                </li>
              </ul>
            </span>
          </Stack>
        )}
      </div>
    </div>
  );
};

export default Search;
